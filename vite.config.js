// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
//SEE: https://vitejs.dev/config/server-options.html#server-https

const BasePath= (process.env.GITHUB_REPOSITORY||'').replace(/^[^\/]*/,'') 

import { VitePWA } from 'vite-plugin-pwa';
import { comlink } from 'vite-plugin-comlink'

function manualChunks(id) {
	console.log("manualChunks",id);
	if (id.includes('node_modules')) {
		return (
			id.includes('prime') ? 'vendor-prime' :
			id.includes('lezer') ? 'vendor-lezer' :
			id.includes('mirror') ? 'vendor-mirror' :
			id.includes('git') ? 'vendor-git' :
			id.includes('ethers') ? 'vendor-ethers' :
			id.includes('qr-scanner') ? 'vendor-qr-scanner' :
			'vendor'
		)
	}
}


// https://vitejs.dev/config/
export default defineConfig({
	base: BasePath,
	resolve: {
		alias: {
			src: "/src", //A: absolute imports
		},
	},
	worker: {
		plugins: () => ([
			nodePolyfills(),
			comlink(),
		])
	},
	plugins: [
		basicSsl(), 
		react(),  
		nodePolyfills(),
		comlink(),
		splitVendorChunkPlugin(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: { //A: pwa manifest template HERE
				name: 'PAUI',
				short_name: 'PAUI',
				description: 'PAUI',
				theme_color: '#000000',
				"share_target": {
					"action": "/share-file-handler",
					"method": "POST",
					"enctype": "multipart/form-data",
					"params": {
						"files": [
							{
								"name": "textFiles",
								"accept": ["text/plain", ".txt"]
							},
							{
								"name": "htmlFiles",
								"accept": ["text/html", ".html"]
							},
							{
								"name": "images",
								"accept": ["image/jpeg", "image/png", "image/webp", "image/gif"]
							}
						]
					}
				}
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: { //SEE: https://vite-pwa-org.netlify.app/guide/development.html#type-declarations
				enabled: true, //A: can install from npm run dev
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		})],
	build: {
		rollupOptions: { output: { manualChunks }},
	},
})
