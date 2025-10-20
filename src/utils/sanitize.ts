// Input sanitization for XSS protection

const SUSPICIOUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick, onerror, etc.
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^<]*>/gi,
]

const DANGEROUS_PROTOCOLS = [
  'javascript:',
  'data:',
  'vbscript:',
  'file:',
]

/**
 * Remove HTML tags from string
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '')
}

/**
 * Escape special HTML characters
 */
export function escapeHtml(input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Check if string contains suspicious patterns
 */
export function containsSuspiciousPatterns(input: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(input))
}

/**
 * Check if string contains dangerous protocols
 */
export function containsDangerousProtocols(input: string): boolean {
  const lower = input.toLowerCase()
  return DANGEROUS_PROTOCOLS.some(protocol => lower.includes(protocol))
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove HTML tags
  let sanitized = stripHtml(input)

  // Escape remaining special characters
  sanitized = escapeHtml(sanitized)

  return sanitized.trim()
}

/**
 * Validate and sanitize message
 * Returns null if message is invalid/dangerous
 */
export function validateAndSanitizeMessage(message: string): string | null {
  if (!message || typeof message !== 'string') {
    return null
  }

  // Check for suspicious patterns
  if (containsSuspiciousPatterns(message)) {
    console.warn('Suspicious pattern detected in message')
    return null
  }

  // Check for dangerous protocols
  if (containsDangerousProtocols(message)) {
    console.warn('Dangerous protocol detected in message')
    return null
  }

  // Sanitize
  const sanitized = sanitizeInput(message)

  // Check if sanitized message is not empty
  if (!sanitized || sanitized.length === 0) {
    return null
  }

  return sanitized
}

/**
 * Sanitize for display (more lenient than validation)
 * Allows some formatting but removes dangerous content
 */
export function sanitizeForDisplay(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove dangerous scripts but allow basic formatting
  let sanitized = input

  SUSPICIOUS_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '')
  })

  return sanitized.trim()
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}
