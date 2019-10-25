import { CSSProperties, ReactChild } from "react";
import { Dropdown, Layout, Icon, Menu, Avatar, Input, Tooltip } from "antd";
import Link from "next/link";
const { Header, Content, Footer } = Layout;

interface iStyle {
	githubIcon: CSSProperties;
	footer: CSSProperties;
}
interface iProps {
	children: ReactChild;
}

const styleObj: iStyle = {
	githubIcon: {
		color: "white",
		fontSize: 40,
		display: "block",
		paddingTop: 10,
		marginRight: 20,
	},
	footer: { textAlign: "center" },
};

function MyLayout(props: iProps) {
	const { children } = props;
	return (
		<Layout>
			<Header>
				<div className="header-inner">
					<div className="header-left">
						<div className="logo">
							<Link href="/">
								<Icon type="github" style={styleObj.githubIcon} />
							</Link>
						</div>
						<div>
							<Input.Search placeholder="搜索仓库" />
						</div>
					</div>
					<div className="header-right">
						<div className="user">
							<Tooltip title="点击进行登录">
								<a href={`/prepare-auth`}>
									<Avatar size={40} icon="user" />
								</a>
							</Tooltip>
						</div>
					</div>
				</div>
			</Header>
			<Content>{children}</Content>
			<Footer style={styleObj.footer}>Develop by max</Footer>
			<style jsx>{`
				.content {
					color: red;
				}
				.header-inner {
					display: flex;
					justify-content: space-between;
				}
				.header-left {
					display: flex;
					justify-content: flex-start;
				}
			`}</style>
		</Layout>
	);
}
export default MyLayout;
