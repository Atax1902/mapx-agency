interface RateLimitEntry {
  count:   number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  ip: string,
  maxRequests = 3,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now   = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  store.set(ip, entry)
  return true
}
