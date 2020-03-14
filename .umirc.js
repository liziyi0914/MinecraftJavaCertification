
// ref: https://umijs.org/config/
export default {
	history: 'hash',
	publicPath: '/MinecraftJavaCertification/',
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: false,
			dynamicImport: false,
			title: 'MinecraftJavaCert',
			dll: false,

			routes: {
				exclude: [
					/components\//,
				],
			},
		}],
	],
}
