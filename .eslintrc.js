module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: [
		// alloy规则
		'alloy',
		'alloy/typescript',
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	// typescript 解析器
	parser: "@typescript-eslint/parser",
	parserOptions: {
		// "project":"./tsconfig.json", //继承tsc配置信息
		ecmaVersion: 2018,
		sourceType: "module",
		ecmaFeatures: {
			modules: true,
			jsx: true,
		},
	},
	// react和ts的plugin
	plugins: ["react", "react-hooks", "@typescript-eslint"],
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"require-atomic-updates": 0,
		"no-unused-vars": 0,
		"no-undef": 0,
		"no-var": 2,
		"no-return-await": 0,
		"no-param-reassign": 0,
		"@typescript-eslint/explicit-member-accessibility": 0,
		"@typescript-eslint/no-parameter-properties": 0,
		"@typescript-eslint/no-var-requires": 0
	},
};
