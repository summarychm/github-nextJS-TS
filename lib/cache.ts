class MyCache {
    timer: { [props: string]: any } = {};
    Data: { [props: string]: any } = {};
    /**
     * 设置cache
     * @param key cacheKey
     * @param value cacheValue
     * @param expTime 过期时间(默认:1000*60)
     */
    setCache(key: string, value: any, expTime: number = 1000 * 60) {
        clearTimeout(this.timer[key]);
        this.Data[key] = value;
        this.timer[key] = setTimeout(() => {
            delete this.Data[key];
            delete this.timer[key];
        }, expTime);
    }
    getCache(key: string) {
        return this.Data[key];
    }
    getAll() {
        return this;
    }
}

export default new MyCache();
