import { isMatch } from 'matcher'

export class Cache {
  /**
   * Create objectTTL
   * Returns undefined for permanent cache
   * @param pathname
   * @param data
   * @returns
   */
  private objectTTL(pathname: string, data: any) {
    // Check wether the endpoint require long duration caching
    const longDurationCache = isMatch(pathname, [
      '*/competitions/*/info.json',
      '*/competitions/*/seasons.json',
      '*/seasons/*/competitors.json',
      '*/competitions.json',
      '*/profile.json',
    ])

    // Return long ttl
    if (longDurationCache) {
      return 60 * 60 * 24 * 15 // 15 days
    }

    // Default 1 hour
    return 60 * 60
  }

  calculateObjectExpiry(pathname: string, data: any) {
    return {
      data: JSON.stringify(data),
      expirationTtl: this.objectTTL(pathname, data),
    }
  }
}
