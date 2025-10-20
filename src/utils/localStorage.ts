// Safe localStorage utilities with debouncing and quota protection

import { STORAGE_CONFIG } from '@/constants/app'

let debounceTimers: Map<string, NodeJS.Timeout> = new Map()

/**
 * Estimate size of data in MB
 */
function estimateSize(data: unknown): number {
  const jsonString = JSON.stringify(data)
  return new Blob([jsonString]).size / (1024 * 1024)
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Safely get item from localStorage
 */
export function getItemSafe<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Failed to get ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * Safely set item to localStorage with quota protection
 */
export function setItemSafe(key: string, value: unknown): boolean {
  if (!isLocalStorageAvailable()) return false

  try {
    const size = estimateSize(value)

    if (size > STORAGE_CONFIG.QUOTA_MB) {
      console.warn(`Data too large (${size.toFixed(2)}MB). Truncating...`)

      // If it's an array (like messages), truncate it
      if (Array.isArray(value)) {
        const truncated = value.slice(-Math.floor(value.length * 0.7))
        localStorage.setItem(key, JSON.stringify(truncated))
        return true
      }

      return false
    }

    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    // Quota exceeded
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Clearing old data...')

      try {
        // Try to clear this specific key's old data
        if (Array.isArray(value)) {
          const truncated = value.slice(-Math.floor(value.length * 0.5))
          localStorage.setItem(key, JSON.stringify(truncated))
          return true
        }
      } catch {
        // If still failing, clear all app data
        clearAppStorage()
        return false
      }
    }

    console.error(`Failed to set ${key} in localStorage:`, error)
    return false
  }
}

/**
 * Debounced localStorage write
 */
export function setItemDebounced(key: string, value: unknown, delay = STORAGE_CONFIG.DEBOUNCE_DELAY): void {
  // Clear existing timer for this key
  if (debounceTimers.has(key)) {
    clearTimeout(debounceTimers.get(key)!)
  }

  // Set new timer
  const timer = setTimeout(() => {
    setItemSafe(key, value)
    debounceTimers.delete(key)
  }, delay)

  debounceTimers.set(key, timer)
}

/**
 * Remove item from localStorage
 */
export function removeItem(key: string): void {
  if (!isLocalStorageAvailable()) return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Failed to remove ${key} from localStorage:`, error)
  }
}

/**
 * Clear all app-related storage
 */
export function clearAppStorage(): void {
  if (!isLocalStorageAvailable()) return

  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('english-tutor-')) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('Failed to clear app storage:', error)
  }
}

/**
 * Truncate messages array to max stored messages
 */
export function truncateMessages<T extends { timestamp: Date | string }>(
  messages: T[],
  maxMessages = STORAGE_CONFIG.MAX_MESSAGES_STORED
): T[] {
  if (messages.length <= maxMessages) {
    return messages
  }

  return messages.slice(-maxMessages)
}

/**
 * Get storage usage percentage
 */
export function getStorageUsage(): number {
  if (!isLocalStorageAvailable()) return 0

  try {
    let total = 0
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }

    // Most browsers have ~5-10MB limit
    const limit = 10 * 1024 * 1024 // 10MB
    return (total / limit) * 100
  } catch {
    return 0
  }
}

// Debounce helper function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
