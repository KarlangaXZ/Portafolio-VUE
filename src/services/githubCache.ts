const CACHE_TTL_MS = 10 * 60 * 1000

interface CacheEntry<T> {
  timestamp: number
  data: T
}

export function readSessionCache<T>(key: string): T | null {
  if (typeof sessionStorage === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(key)
      return null
    }
    return entry.data
  } catch {
    sessionStorage.removeItem(key)
    return null
  }
}

export function writeSessionCache<T>(key: string, data: T): void {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data } satisfies CacheEntry<T>))
  } catch {
    // Storage can be unavailable or full; network data remains usable in memory.
  }
}

export function removeSessionCache(key: string): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.removeItem(key)
}
