import Link from 'next/link';
import { Icon, Avatar } from 'antd';

import { getLastUpdated } from '$lib/utils';

function getLicense(license) {
    return license ? `${license.spdx_id} license` : '';
}

export const Repo = ({ repo }) => {
    return (
        <div className="root">
            <div className="user-info">
                <Avatar size={80} src={repo.owner.avatar_url} />
                <p>{repo.owner.login}</p>
            </div>
            <div className="basic-info">
                <h3 className="repo-title">
                    <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
                        <a>{repo.full_name}</a>
                    </Link>
                </h3>
                <p className="repo-desc">{repo.description}</p>
                <p className="other-info">
                    {repo.license ? (
                        <span className="license">{getLicense(repo.license)}</span>
                    ) : null}
                    <span className="last-updated">{getLastUpdated(repo.updated_at)}</span>
                    <span className="open-issues">{repo.open_issues_count} open issues</span>
                </p>
            </div>
            <div className="lang-star">
                <span className="lang">{repo.language}</span>
                <span className="stars">
                    {repo.stargazers_count} <Icon type="star" theme="filled" />
                </span>
            </div>
            <style jsx>{`
                .root {
                    display: flex;
                    flex: 1;
                    justify-content: space-between;
                }
                .other-info > span + span {
                    margin-left: 10px;
                }
                .root + .root {
                    border-top: 1px solid #eee;
                    padding-top: 20px;
                }
                .user-info {
                    width: 100px;
                }
                .basic-info {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                }
                .repo-title {
                    font-size: 20px;
                }
                .lang-star {
                    display: flex;
                }
                .lang-star > span {
                    width: 120px;
                    text-align: right;
                }
                .repo-desc {
                    width: 400px;
                }
            `}</style>
        </div>
    );
};
