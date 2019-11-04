import { useState, useCallback } from 'react';
import { Button, Avatar } from 'antd';

import { Label } from './label';
import { getLastUpdated } from '$lib/utils';

export function IssueItem({ issue }) {
    const [showDetail, setShowDetail] = useState(false);

    const toggleShowDetail = useCallback(() => setShowDetail((detail) => !detail), []);

    return (
        <div>
            <div className="issue">
                <Button
                    type="primary"
                    size="small"
                    style={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={toggleShowDetail}
                >
                    {showDetail ? '隐藏' : '查看'}
                </Button>
                <div className="avatar">
                    <Avatar src={issue.user.avatar_url} shape="square" size={50} />
                </div>
                <div className="main-info">
                    <h6>
                        <span>{issue.title}</span>
                        {issue.labels.map((label) => (
                            <Label label={label} key={label.id} />
                        ))}
                    </h6>
                    <p className="sub-info">
                        <span>Updated at {getLastUpdated(issue.updated_at)}</span>
                    </p>
                </div>
                <style jsx>{`
                    .issue {
                        display: flex;
                        position: relative;
                        padding: 10px;
                    }
                    .issue:hover {
                        background: #fafafa;
                    }
                    .issue + .issue {
                        border-top: 1px solid #eee;
                    }
                    .main-info > h6 {
                        max-width: 600px;
                        font-size: 16px;
                        padding-right: 40px;
                    }
                    .avatar {
                        margin-right: 20px;
                    }
                    .sub-info {
                        margin-bottom: 0;
                    }
                    .sub-info > span + span {
                        display: inline-block;
                        margin-left: 20px;
                        font-size: 12px;
                    }
                `}</style>
            </div>
            {/* {showDetail ? <IssueDetail issue={issue} /> : null} */}
        </div>
    );
}
