export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();

  public add<T>(key: string, val: T) {
    const date = Date.now();
    const newCache: CacheEntry<T> = { createdAt: date, val: val };
    this.#cache.set(key, newCache);
  }

  public get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return undefined;
    const cutoff = Date.now() - this.#interval;
    if (entry.createdAt < cutoff) {
      this.#cache.delete(key);
      return undefined;
    }

    return entry.val;
  }

  #reapIntervalId: NodeJS.Timeout | undefined = undefined;

  #interval: number;

  #reap() {
    this.#cache.forEach((val, key) => {
      const cutoff = Date.now() - this.#interval;
      let cacheTime: number = val.createdAt;
      if (cacheTime < cutoff) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }
  public stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
