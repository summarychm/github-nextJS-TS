import { action } from "typesafe-actions";
import axios from "axios";
import { Dispatch } from "redux";
import { message } from "antd";

import { eUserType } from "../action-types";
import configUrls from "@/configUrls";

export default {
	logOut() {
		return (dispatch: Dispatch) => {
			axios
				.post(configUrls.api.logout)
				.then((res) => {
					if (res.status === 200) {
						dispatch(action(eUserType.LOGOUT));
					} else {
						message.error(res);
						console.error("logout error:", res);
					}
				})
				.catch((err) => {
					message.error(err);
					console.error("logout axios error:", err);
				});
		};
	},
};
