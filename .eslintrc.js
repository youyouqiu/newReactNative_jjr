module.exports = {
    root: true,
    plugins: [
		"react",
		"react-native"
	],
    parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
			modules: true
		}
    },
    env: {
      	node: true,
	},
	parser: "babel-eslint",
	rules: {
		"quotes": [1, "single"],
		"indent": ['error', 4],
		"no-undef": 2,
		'no-console': 1,
		'no-debugger': 2,
		"no-unused-vars": 2,
		"react/jsx-uses-react": 2,
		"react/jsx-uses-vars": 2,
	},
	globals: {
		"fetch": false,
		"Headers": false,
		"storage": false
	}
};
