import { CSSProperties, ReactChild } from "react";
import { Dropdown, Layout, Icon, Menu, Avatar, Input, Tooltip } from "antd";
import Link from "next/link";
import getConfig from "next/config";

import Container from "./Components/Container"; //HOC,减少DOM层级

const { Header, Content, Footer } = Layout;
const { publicRuntimeConfig } = getConfig();

const styleObj: any = {
	githubIcon: {
		color: "white",
		fontSize: 40,
		display: "block",
		paddingTop: 10,
		marginRight: 20,
	},
	footer: { textAlign: "center" },
};
interface iProps {
	children: ReactChild;
}
function MyLayout(props: iProps) {
	const { children } = props;
	return (
		<Layout>
			<Header>
				<Container Component={<div className="header-inner" />}>
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
								<a href={`${publicRuntimeConfig.OAUTH_URL}`}>
									<Avatar size={40} icon="user" />
								</a>
							</Tooltip>
						</div>
					</div>
				</Container>
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
