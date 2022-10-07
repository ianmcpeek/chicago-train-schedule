/**
 * Wrapper Client for localStorage to be optionally used within services
 */
class CacheClient {
    public get(key: string): any {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item): null;
    }

    public set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default CacheClient;