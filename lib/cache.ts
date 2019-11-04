class MyCache {
    timer: { [props: string]: any } = {};
    Data: { [props: string]: any } = {};
    // constructor() {}
    setCache(key, value, expTime: number = 1000 * 60) {
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
