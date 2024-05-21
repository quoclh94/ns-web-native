const webpack = require("@nativescript/webpack");
const {resolve} = require("path");

module.exports = (env) => {
	console.log('env', env);
	webpack.init(env);
	webpack.chainWebpack(config => {
		config.resolve.alias.set('tns-core-modules', '@nativescript/core'),
		config.resolve.set("fallback", {
			os: false,
			tty: false,
			assert: false,
			stream: false,
			https: false,
			http: false,
			url: false,
			util: false,
			zlib: false,
		});
		config.resolve.alias.set(
			'@core-common',
			resolve(__dirname, '../../libs/core-common/src')
		);
		config.resolve.extensions.prepend('.native.ts');

	});

	return webpack.resolveConfig();
};
