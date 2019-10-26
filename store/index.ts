import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducers from "./reducers";

// let composeEnhancer = window && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ? window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] : compose;
let enhancer = applyMiddleware(thunk);
let enhancers = composeWithDevTools(enhancer);

export default function createRootStore(initialState) {
	return createStore(reducers, initialState, enhancers);
}
