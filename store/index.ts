import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducers from "./reducers";

let enhancer = applyMiddleware(thunk);
let enhancers = composeWithDevTools(enhancer);

// 创建新的store实例
export default function createRootStore(initialState) {
	return createStore(reducers, initialState, enhancers);
}
