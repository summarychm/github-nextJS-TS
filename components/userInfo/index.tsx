import { ReactElement, useCallback, useState } from "react";
import { Avatar, Dropdown, Tooltip, Menu } from "antd";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function userInfoComponent(props): ReactElement {
	const { user, logout } = props;

	const overlayDropItem = (
		<Menu>
			<Menu.Item>
				<a href="javascript:void(0);" onClick={logout}>
					登出
				</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<div className="user">
			{user && user.id ? (
				<Dropdown overlay={overlayDropItem}>
					<a href="/">
						<Avatar size={40} src={user.avatar_url} />
					</a>
				</Dropdown>
			) : (
				<Tooltip title="点击进行登录">
					<a href={publicRuntimeConfig.OAUTH_URL}>
						<Avatar size={40} icon="user" />
					</a>
				</Tooltip>
			)}
		</div>
	);
}
