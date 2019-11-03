import Link from 'next/link';
import { NextPageContext } from 'next';
function makeQuery(queryObj) {
    const query = Object.entries(queryObj)
        .reduce((result, entry) => {
            result.push(entry.join('='));
            return result;
        }, [])
        .join('&');
    return `?${query}`;
}
interface IProps {
    type: string;
    queryObj: any;
}
export function DetailTabs({ type, queryObj }: IProps) {
    let query = makeQuery(queryObj);
    return (
        <div className="tabs">
            {type === 'readme' ? (
                <span className="tab">Readme</span>
            ) : (
                <Link href={`/detail${query}`}>
                    <a className="tab readme">Readme</a>
                </Link>
            )}
            {type === 'issues' ? (
                <span className="tab">Issues</span>
            ) : (
                <Link href={`/detail/issues${query}`}>
                    <a className="tab issues">Issues</a>
                </Link>
            )}
            <style jsx>{`
                .tabs .tab {
                    margin-left: 20px;
                }
            `}</style>
        </div>
    );
}
