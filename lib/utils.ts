import moment from "moment";

export function getLastUpdated(time) {
	return moment(time).fromNow();
}
export const noop = () => {};
