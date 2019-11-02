import moment from "moment";
import atob from "atob";

export function getLastUpdated(time) {
	return moment(time).fromNow();
}
export const noop = () => {};

export function b64ToUtf8(str) {
	return decodeURIComponent(escape(atob(str)));
}
