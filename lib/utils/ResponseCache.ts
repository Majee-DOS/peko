export class CacheItem { 
  key: string
  value: Response
  dob: number
  count: number

  constructor(key: string, value: Response) {
    this.key = key
    this.value = value
    this.dob = Date.now()
    this.count = 0
  }

  useRate() {
    return this.count / (Date.now() - this.dob)
  }
}

export interface CacheOptions { 
  lifetime?: number
  memoryLimit?: number
  items?: {
    key: string,
    value: Response
  }[]
}

/**
 * Response caching class, provides memoize method to be used on handlers or next() in middleware
 * @param options: CacheOptions (default = {lifetime: Infinity (unlimited ms), memoryLimit: 64 * 1024 * 1024 (64MB) })
 * @returns memoizeHandler: (handler: Handler) => Handler
 */
export class ResponseCache {
  items: Array<CacheItem>
  lifetime: number
  MEMORY_LIMIT: number

  constructor(opts?: CacheOptions) {
    this.lifetime = opts && opts.lifetime 
      ? opts.lifetime 
      : Infinity

    this.MEMORY_LIMIT = opts && opts.memoryLimit 
      ? opts.memoryLimit 
      : 64 * 1024 * 1024

    this.items = opts && opts.items 
      ? opts.items.map(item => new CacheItem(item.key, item.value))
      : []
  }

  get(key: string): CacheItem | undefined {
    const item = this.items.find(item => item.key == key && Date.now() < item.dob + this.lifetime)
    if (!item) return undefined
    item.count++
    return item
  }

  set(key: string, value: Response): CacheItem {
    // await this.clean() <-- no worky with Deno Deploy

    const newItem = new CacheItem(key, value)
    this.items = [ ...this.items.filter((item) => item.key !== key), newItem ]

    return newItem
  }

  clean(): Promise<void> {
    return new Promise<void>((res) => {
      if (Deno.memoryUsage().heapTotal < this.MEMORY_LIMIT) return res()
      
      this.items.sort((item1, item2) => item1.useRate() < item2.useRate() ? 1 : 0) 
      this.items.splice(Math.floor(this.items.length/2))
      return res()
    })
  }
}