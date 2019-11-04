import axios, { Method, AxiosRequestConfig } from 'axios';

import { github } from '../configUrls';

const isServer = typeof window === 'undefined';

export async function request(
    { method = 'GET', url, data = {} }: AxiosRequestConfig,
    req?: any,
    auth = true
) {
    if (!url) throw Error('url must provide');
    console.log('============ url begin ====================');
    console.log(url, isServer);
    console.log('============ url end ======================');
    if (isServer) {
        const { session } = req;
        const githubAuth = session.githubAuth || {};
        const headers = {};
        if (githubAuth.access_token && auth) {
            headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
        }
        return await requestGithub(method, url, data, headers);
    } else {
        if (!url.match(/api/i)) url = '/github' + url; // 非api接口都认为是非内部接口
        return await axios({ method, url, data });
    }
}

export async function requestGithub(method: Method, url: string, data: any, headers?: any) {
    if (!headers) headers = { Accept: 'application/json' };
    // github的相对路径添加默认前缀
    if (!url.match(/http/i)) url = `${github.base_url}${url}`;
    return await axios({ method, url, data, headers });
}
