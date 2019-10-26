import "react";
declare module "react" {
	// refer https://github.com/zeit/styled-jsx/issues/90#issuecomment-318052994
	interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
		jsx?: boolean;
		global?: boolean;
	}
}
declare interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any; // redux-dev-tools
	store?: any; // 方便调试
}
