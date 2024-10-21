//INFO: generate manifest.webmanifest, included by vite.config.js
//U: using 'application/*' doesn't do the trick but adding as many mimetypes and filetypes as you can seems to get the serviceworker to accept them if they are listed explicitly.

import mimeDb from 'mime-db';
import fileTypes from './src/svc/extensions.json' with {type: 'json'} //FROM: https://github.com/dyne/file-extension-list/blob/master/pub/extensions.json
//DBG: console.log(fileTypes)

//SEE: https://developer.chrome.com/docs/capabilities/web-apis/web-share-target#sample_applications
//SEE: https://developer.mozilla.org/en-US/docs/Web/Manifest/file_handlers
//SEE: https://developer.mozilla.org/en-US/docs/Web/Manifest/shortcuts
//SEE: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/manifest.json
export const BaseManifest= { //A: pwa manifest template HERE
	name: 'PAUI',
	short_name: 'PAUI',
	description: 'PAUI',
	start_url: './?version=1', //A: tiene que ser ABSOLUTA, no ./ para que ande share_target!
	theme_color: '#000000',
	share_target: {
		"action": "./_share-target",
		"enctype": "multipart/form-data",
		"method": "POST",
		"params": {
			"files": [{ //SEE: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/manifest.json
				"name": "media",
				"accept": []
			}]
		}
	},
	file_handlers: [
    {
      "action": "/",
      "accept": {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"]
      }
    }
  ]
};

export const allFileTypesAndMimes = () => {
	let r= {};
	Object.keys(mimeDb).forEach(e => r[e]=1)
	Object.keys(fileTypes).forEach(ext => r['application/'+ext]=1)
	return Object.keys(r).sort();
}

export const allMimeToExtension = () => {
	let r= {};
	Object.entries(fileTypes).forEach(([ext,types]) => 
		r['application/'+ext]=['.'+ext]
	)
	return r;
}

export const makeManifest = () => {
	let r= {...BaseManifest}
	r.share_target.params.files=[
		{ name: 'text', accept: ['text/plain', 'text/string'], },
		{ name: 'media',
			accept: [
				'audio/*', 'image/*', 'video/*', 'application/x-pdf',
				...allFileTypesAndMimes(),
			],
		},
	];
	r.file_handlers[0].accept= {
		...r.file_handlers[0].accept,
		...allMimeToExtension(),
	}
	return r;
}

