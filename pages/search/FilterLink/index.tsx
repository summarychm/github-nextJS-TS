import { isValidElement, ReactElement } from 'react';
import Link from 'next/link';

import { getQueryString } from '$lib/getQueryString';

interface IProps {
    name: string | ReactElement;
    query?: string;
    lang?: string;
    sort?: string;
    order?: string;
    page?: number;
}
export default function FilterLink(props: IProps) {
    let { name } = props;
    let queryString = getQueryString(props);
    return (
        <Link href={`/search${queryString}`}>{isValidElement(name) ? name : <a>{name}</a>}</Link>
    );
}
