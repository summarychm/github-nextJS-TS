import axios, { Method } from "axios";

import { github } from "../configUrls";

const isServer = typeof window === "undefined";

export async function request({ method, url, data }, req: any) {
	if (!url) throw Error("url must provide");
	if (isServer) {
		const { githubAuth } = req.session;
		if (!githubAuth || !githubAuth.access_token) throw new Error("access_token must provide");
		const headers = {
			Authorization: `${githubAuth.token_type} ${githubAuth.access_token}`,
		};
		return await requestGithub(method, url, data, headers);
	} else {
		return await axios({ method, url, data });
	}
}

export async function requestGithub(method: Method, url: string, data: any, headers?: any) {
	if (!headers) headers = { Accept: "application/json" };
	// github的相对路径添加默认前缀
	if (!url.match(/http/i)) url = `${github.base_url}${url}`;
	return await axios({ method, url, data, headers });
}
