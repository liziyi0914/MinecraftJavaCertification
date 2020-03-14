
// ref: https://umijs.org/config/
export default {
	history: 'hash',
	publicPath: '/MinecraftJavaCertification/',
	treeShaking: true,
	proxy: {
		'/api/uuid': {
			'target': 'https://api.mojang.com/users/profiles/minecraft',
			'changeOrigin': true,
			'pathRewrite': { '^/api/uuid': '' },
		},
		'/api/profile': {
			'target': 'https://sessionserver.mojang.com/session/minecraft/profile/',
			'changeOrigin': true,
			'pathRewrite': { '^/api/profile': '' }
		},
		'/api/skin': {
			'target': 'http://textures.minecraft.net/texture/',
			'changeOrigin': true,                                  'pathRewrite': { '^/api/skin': '' },
		},
	},
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
