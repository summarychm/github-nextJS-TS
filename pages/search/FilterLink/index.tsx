import { isValidElement, ReactElement } from "react";
import { List } from "antd";
import Link from "next/link";
import { getQueryString } from "$lib/getQueryString";

interface iProps {
	name: string | ReactElement;
	query?: string;
	lang?: string;
	sort?: string;
	order?: string;
	page?: number;
}
export function FilterLink(props: iProps) {
	let { name } = props;
	let queryString = getQueryString(props);
	return <Link href={`/search${queryString}`}>{isValidElement(name) ? name : <a>{name}</a>}</Link>;
}
