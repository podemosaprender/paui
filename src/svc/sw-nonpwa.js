//INFO: a worker for non-pwa, non serviceWorker environments

console.log('NON-PWA Worker starting');

import { api_onmessage, api_registerRoutes, cacheName, channelName, urlPrefix} from 'src/svc/api';

//XXX:DRY sw.js {
self.addEventListener('message', async (event) => {
	console.log("MSG", event.source!=null, event);
	let r= await api_onmessage(event);
  if (r!=null) (event.source || self).postMessage(r);
	console.log("MSG R OK", r, event.source!=null, event);
});
console.log("SW waiting for messages");
//XXX:DRY sw.js }


