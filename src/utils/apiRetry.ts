// API retry logic with exponential backoff

import { API_CONFIG } from '@/constants/app'

interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  retryableStatusCodes?: number[]
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Fetch with retry logic and exponential backoff
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const {
    maxAttempts = API_CONFIG.RETRY_ATTEMPTS,
    initialDelay = API_CONFIG.RETRY_INITIAL_DELAY,
    retryableStatusCodes = API_CONFIG.RETRYABLE_STATUS_CODES
  } = retryOptions

  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(url, options)

      // If response is ok or not retryable, return it
      if (response.ok || !(retryableStatusCodes as readonly number[]).includes(response.status)) {
        return response
      }

      // If it's a retryable status code, store it and retry
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`)

      if (attempt < maxAttempts - 1) {
        const delay = initialDelay * Math.pow(2, attempt)
        console.warn(`Request failed with status ${response.status}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxAttempts})`)
        await sleep(delay)
        continue
      }

      // Last attempt, return the response even if it's an error
      return response

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxAttempts - 1) {
        const delay = initialDelay * Math.pow(2, attempt)
        console.warn(`Request failed: ${lastError.message}. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxAttempts})`)
        await sleep(delay)
        continue
      }
    }
  }

  // If we get here, all retries failed
  throw lastError || new Error('All retry attempts failed')
}

/**
 * Fetch JSON with retry logic
 */
export async function fetchJsonWithRetry<T = unknown>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options, retryOptions)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return response.json() as Promise<T>
}

/**
 * Post JSON with retry logic
 */
export async function postJsonWithRetry<T = unknown>(
  url: string,
  data: unknown,
  retryOptions: RetryOptions = {}
): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  return fetchJsonWithRetry<T>(url, options, retryOptions)
}
