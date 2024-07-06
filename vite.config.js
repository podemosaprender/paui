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
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			injectRegister: false,
			pwaAssets: { disabled: false, config: true, }, //A: use asset generator

			//SEE: https://developer.chrome.com/docs/capabilities/web-apis/web-share-target#sample_applications
			//SEE: https://developer.mozilla.org/en-US/docs/Web/Manifest/file_handlers
			//SEE: https://developer.mozilla.org/en-US/docs/Web/Manifest/shortcuts
			//SEE: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/manifest.json
			manifest: { //A: pwa manifest template HERE
				name: 'PAUI',
				short_name: 'PAUI',
				description: 'PAUI',
				start_url: '/paui/?version=1', //A: tiene que ser ABSOLUTA, no ./ para que ande share_target!
				theme_color: '#000000',
				share_target: {
					"action": "/_share-target",
					"enctype": "multipart/form-data",
					"method": "POST",
					"params": {
						"files": [{ //SEE: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/manifest.json
							"name": "media",
							"accept": [
								"audio/*",
								"image/*",
								"video/*",
								"applicaton/pdf"
							]
						}]
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
