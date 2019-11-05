"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("next/router"));
const events = ["routeChangeStart", "routeChangeComplete", "routeChangeError", "beforeHistoryChange", "hashChangeStart", "hashChangeComplete"];
function makeEvent(type) {
    return (...args) => console.log("Router->", type, ...args);
}
events.forEach((event) => router_1.default.events.on(event, makeEvent(event)));
//# sourceMappingURL=routerEvents.js.map