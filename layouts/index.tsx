import { CSSProperties, ReactChild, ReactComponentElement, ReactElement } from "react";
import { Dropdown, Layout, Icon, Menu, Avatar, Input, Tooltip } from "antd";
import Link from "next/link";
import getConfig from "next/config";
import { connect } from "react-redux";

import UserInfo from "$components/userInfo";

import Container from "./Components/Container"; //HOC,减少DOM层级
import userAction from "../store/actions/user";
import userReducer from "store/reducers/user";

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
	user: any;
	logOut?: () => void;
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
						<UserInfo user={props.user} logout={props.logOut} />
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

const mapStateToProps = function(state) {
	return { user: state.user };
};
export default connect(
	mapStateToProps,
	userAction,
)(MyLayout);
