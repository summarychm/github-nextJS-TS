"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisSessionStore {
    constructor(client) {
        this.client = client;
        this.client = client;
    }
    async get(sid) {
        try {
            const id = this.getRedisSessionId(sid);
            // console.log("get session", id);
            const data = await this.client.get(id);
            if (!data)
                return null;
            return JSON.parse(data);
        }
        catch (err) {
            console.error('get Session', err);
        }
    }
    async set(sid, session, ttl) {
        try {
            const id = this.getRedisSessionId(sid);
            console.log('set session', id);
            const seesionStr = JSON.stringify(session);
            if (ttl) {
                ttl = Math.ceil(ttl / 1000);
                return await this.client.setex(id, ttl, seesionStr);
            }
            return await this.client.set(id, session);
        }
        catch (err) {
            console.error('set session', err);
        }
    }
    async destroy(sid) {
        const id = this.getRedisSessionId(sid);
        await this.client.del(id);
    }
    getRedisSessionId(sid) {
        return `ssid:${sid}`;
    }
}
exports.default = RedisSessionStore;
// module.exports = RedisSessionStore;
//# sourceMappingURL=session-store.js.map