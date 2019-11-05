"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const configUrls_1 = require("../configUrls");
const isServer = typeof window === 'undefined';
async function request({ method = 'GET', url, data = {} }, req) {
    if (!url)
        throw Error('url must provide');
    // console.log('============ url begin ====================');
    // console.log(url, isServer);
    // console.log('============ url end ======================');
    if (url.startsWith('http'))
        return await axios_1.default({ method, url, data });
    if (isServer) {
        const { session } = req;
        const githubAuth = session.githubAuth || {};
        const headers = {};
        if (githubAuth.access_token) {
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
        }
        return await requestGithub(method, url, data, headers);
    }
    else {
        if (!url.match(/api/i))
            url = '/github' + url; // 非api接口都认为是非内部接口
        return await axios_1.default({ method, url, data });
    }
}
exports.request = request;
async function requestGithub(method, url, data, headers) {
    if (!headers)
        headers = { Accept: 'application/json' };
    // github的相对路径添加默认前缀
    if (!url.match(/http/i))
        url = `${configUrls_1.github.base_url}${url}`;
    return await axios_1.default({ method, url, data, headers });
}
exports.requestGithub = requestGithub;
//# sourceMappingURL=request.js.map