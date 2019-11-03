import { Redis as typeRedis } from 'ioredis';
// const Redis=require("ioredis")

export default class RedisSessionStore {
    constructor(public client: typeRedis) {
        this.client = client;
    }
    async get(sid: string) {
        try {
            const id = this.getRedisSessionId(sid);
            // console.log("get session", id);
            const data = await this.client.get(id);
            if (!data) return null;
            return JSON.parse(data);
        } catch (err) {
            console.error('get Session', err);
        }
    }
    async set(sid: string, session: Object, ttl?: number) {
        try {
            const id = this.getRedisSessionId(sid);
            console.log('set session', id);
            const seesionStr = JSON.stringify(session);
            if (ttl) {
                ttl = Math.ceil(ttl / 1000);
                return await this.client.setex(id, ttl, seesionStr);
            }
            return await this.client.set(id, session);
        } catch (err) {
            console.error('set session', err);
        }
    }
    async destroy(sid: string) {
        const id = this.getRedisSessionId(sid);
        await this.client.del(id);
    }
    getRedisSessionId(sid: string) {
        return `ssid:${sid}`;
    }
}
// module.exports = RedisSessionStore;
