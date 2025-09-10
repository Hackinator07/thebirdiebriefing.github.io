// Translation cache to avoid redundant API calls
interface CacheEntry {
  translation: string;
  timestamp: number;
  language: string;
}

class TranslationCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private readonly MAX_CACHE_SIZE = 1000; // Maximum number of cached translations

  private generateKey(text: string, targetLanguage: string): string {
    return `${text.toLowerCase().trim()}_${targetLanguage}`;
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > this.CACHE_DURATION;
  }

  private cleanup(): void {
    // Remove expired entries
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      }
    }

    // If still over limit, remove oldest entries
    if (this.cache.size > this.MAX_CACHE_SIZE) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = entries.slice(0, this.cache.size - this.MAX_CACHE_SIZE);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  get(text: string, targetLanguage: string): string | null {
    const key = this.generateKey(text, targetLanguage);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.translation;
  }

  set(text: string, targetLanguage: string, translation: string): void {
    const key = this.generateKey(text, targetLanguage);
    
    this.cache.set(key, {
      translation,
      timestamp: Date.now(),
      language: targetLanguage
    });

    // Periodic cleanup
    if (this.cache.size % 50 === 0) {
      this.cleanup();
    }
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; languages: Set<string> } {
    const languages = new Set<string>();
    for (const entry of this.cache.values()) {
      languages.add(entry.language);
    }
    
    return {
      size: this.cache.size,
      languages
    };
  }
}

// Export singleton instance
export const translationCache = new TranslationCache();
