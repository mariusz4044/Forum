export class CacheManager {
  private cache: Array<{ key: string, fn: Function, data: any, args: any[] | null }> = [];
  private interval: any = null;
  private refreshTime: number;

  constructor(intervalMs: number = 5000) {
    this.refreshTime = intervalMs;
  }

  add(key: string, fn: Function, args: any[] | null = null) {
    this.cache.push({ key, fn, data: null, args });
  }

  get(key: string) {
    const item = this.cache.find(x => x.key === key);
    return item ? item.data : null;
  }

  private async refresh() {
    for (const item of this.cache) {
      try {
        if (item.args) {
          item.data = await item.fn(...item.args);
        } else {
          item.data = await item.fn();
        }
      } catch (error) {
        console.error(`Error refreshing ${item.key}:`, error);
      }
    }
  }

  start() {
    if (this.interval) return;
    
    this.refresh();
    this.interval = setInterval(() => this.refresh(), this.refreshTime);
    this.log(`Cache manager running in ${this.refreshTime} interval.`)
  }

  log(text: string) {
    console.log(`[CacheManager] ${text}`)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}