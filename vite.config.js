// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { makeManifest, allFileTypesAndMimes } from './manifest.js';
import vitePluginRequire from "vite-plugin-require";

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
		...(process.env.NOSSL ? [] : [basicSsl()]),
		react(),  
		vitePluginRequire.default(),
		nodePolyfills(),
		comlink(),
		splitVendorChunkPlugin(),
		VitePWA({
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			injectRegister: false,
			pwaAssets: { disabled: false, config: true, }, //A: use asset generator
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},
			manifest: makeManifest(),

			devOptions: { //SEE: https://vite-pwa-org.netlify.app/guide/development.html#type-declarations
				enabled: true, //A: can install from npm run dev
				navigateFallback: 'index.html',
				suppressWarnings: false,
				type: 'module',
			},
		})],
	build: {
		//minify: false,
		commonjsOptions: { transformMixedEsModules: true },
		rollupOptions: { output: { manualChunks }},
	},
})
