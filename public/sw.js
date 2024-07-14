//INFO: custom PWA service worker
//FROM: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/js/service-worker.js

import {CacheOnly} from 'workbox-strategies';
import {clientsClaim, skipWaiting} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {RangeRequestsPlugin} from 'workbox-range-requests';
import {registerRoute} from 'workbox-routing';

import { api_onmessage, api_registerRoutes, cacheName, channelName, urlPrefix} from 'src/svc/api';

self.addEventListener('message', async (event) => {
	console.log("MSG", event.source!=null, event);
	let r= await api_onmessage(event);
  if (r!=null) event.source.postMessage(r);
	console.log("MSG R OK", r, event.source!=null, event);
});
console.log("SW waiting for messages");

// This event is fired when a user has taken action in the browser to remove
// an item that was previously added to the content index.
// In Android Chrome, this is triggered by a deletion from the Downloads screen.
self.addEventListener('contentdelete', (event) => {
  const cacheKey = event.id;
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.delete(cacheKey);
  })());
});

const cachedMediaHandler = new CacheOnly({ cacheName, plugins: [ new RangeRequestsPlugin(),] }); 
//A: Support for cache requests that include a Range: header.  ],

skipWaiting();
clientsClaim();

//A: replaced by the list of files to precache by `workbox injectManifest` build step.
precacheAndRoute(self.__WB_MANIFEST);

//SEE: https://developer.chrome.com/docs/workbox/modules/workbox-routing/#how_to_register_a_regular_expression_route
const routeDbgCb = ({url, request, event}) => { console.log("FETCH",{url,request}); return false; };
registerRoute(routeDbgCb,() => {});
api_registerRoutes(registerRoute);
registerRoute( new RegExp(urlPrefix), cachedMediaHandler);
