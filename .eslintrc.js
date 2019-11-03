module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: [
		'alloy',
		'alloy/typescript',
		// "eslint:recommended",
		// "plugin:@typescript-eslint/eslint-recommended"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			modules: true,
			jsx: true,
		},
	},
	plugins: ["react", "react-hooks", "@typescript-eslint"],
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"require-atomic-updates": 0,
		"no-unused-vars": 0,
		"no-undef": 0,
		"no-var": 2,
	},
};
