import { memo, useMemo } from "react";
import { NextPageContext } from "next";
import MarkDownIt from "markdown-it";
import { b64ToUtf8 } from "$lib/utils";

const md = new MarkDownIt({
	html: true,
	linkify: true,
});

interface iPops {
	content: NextPageContext;
	isBase64: boolean;
}
export default memo(function MarkDownRenderer({ content, isBase64 }: iPops) {
	const markdown = isBase64 ? b64ToUtf8(content) : content;
	const html = useMemo(() => md.render(markdown), [markdown]);
	return (
		<div className="markdown-body">
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
});
