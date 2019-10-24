import Router from "next/router";
const events = ["routeChangeStart", "routeChangeComplete", "routeChangeError", "beforeHistoryChange", "hashChangeStart", "hashChangeComplete"];

function makeEvent(type) {
	return (...args) => console.log("Router->", type, ...args);
}
events.forEach((event) => Router.events.on(event, makeEvent(event)));
