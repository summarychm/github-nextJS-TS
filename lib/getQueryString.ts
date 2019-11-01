interface iProps {
	query?: string;
	lang?: string;
	sort?: string;
	order?: string;
	page?: number;
}
const per_page = 30;
/**
 * 动态拼接github search url
 * @param param 要拼接的url参数 集合
 */
export function getQueryString({ query, lang, sort, order, page }: iProps) {
	let queryString = `?query=${query}`;
	if (lang) queryString += `&lang=${lang}`;
	if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
	if (page) queryString += `&page=${page}`;
	queryString += `&per_page=${per_page}`;
	return queryString;
}
