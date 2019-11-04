import { Button } from 'antd';
import MarkDownRenderer from '$components/MarkDownRenderer';

export function IssueDetail({ issue }) {
    return (
        <div className="root">
            <MarkDownRenderer content={issue.body} isBase64={false} />
            <div className="actions">
                <Button href={issue.html_url} target="_blank">
                    打开Issue讨论页面
                </Button>
            </div>
            <style jsx>{`
                .root {
                    background: #fefefe;
                    padding: 20px;
                }
                .actions {
                    text-align: right;
                }
            `}</style>
        </div>
    );
}
