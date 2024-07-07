//INFO: custom PWA service worker
//FROM: https://github.com/GoogleChrome/samples/blob/gh-pages/web-share/src/js/service-worker.js

import {CacheOnly} from 'workbox-strategies';
import {clientsClaim, skipWaiting} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {RangeRequestsPlugin} from 'workbox-range-requests';
import {registerRoute} from 'workbox-routing';

import { fsp } from '../src/svc/git'

//import {cacheName, channelName, urlPrefix} from './constants';
const cacheName= 'media';
const channelName= 'messages';
const urlPrefix= '/_media/';

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel(channelName) : null;

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

const shareTargetHandler = async ({event}) => {
  if (broadcastChannel) {
    broadcastChannel.postMessage('Saving media locally...');
  }

  const formData = await event.request.formData();
  const mediaFiles = formData.getAll('media');
  const cache = await caches.open(cacheName);

  for (const mediaFile of mediaFiles) {
    // TODO: Instead of bailing, come up with a
    // default name for each possible MIME type.
    if (!mediaFile.name) {
      if (broadcastChannel) {
        broadcastChannel.postMessage('Sorry! No name found on incoming media.');
      }
      continue;
    }

    const cacheKey = new URL(`${urlPrefix}${Date.now()}-${mediaFile.name}`, self.location).href;
    await cache.put(
      cacheKey,
      new Response(mediaFile, {
        headers: {
          'content-length': mediaFile.size,
          'content-type': mediaFile.type,
        },
      })
    );
  }

	try {
		await fsp.init();
		try { fsp.mkdir('/up') } catch (ex) { console.log("fsp mkdir",ex) } ;
		console.log("shareTargetHandler fsp init OK");
	} catch(ex) {
		console.log("shareTargetHandler fsp init ERROR",ex);
	}

	try {
		await	fsp.writeFile('/up/'+mediaFile.name, await mediaFile.bytes());
		console.log("shareTargetHandler fsp",ok)
	} catch (ex) {
		console.log("shareTargetHandler fsp",ex)
	}

  // Use the MIME type of the first file shared to determine where we redirect.
	const routeToRedirectTo = null; //XXX: let app decide and inform user
	const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/paui/'; //XXX:HC

	return Response.redirect(redirectionUrl, 303); //A: After the POST succeeds, redirect to the main page.
};

const cachedMediaHandler = new CacheOnly({
  cacheName,
  plugins: [
		new RangeRequestsPlugin(), //A: Support for cache requests that include a Range: header.
  ],
});

skipWaiting();
clientsClaim();

// This will be replaced by the list of files to precache by
// the `workbox injectManifest` build step.
precacheAndRoute(self.__WB_MANIFEST);

//SEE: https://developer.chrome.com/docs/workbox/modules/workbox-routing/#how_to_register_a_regular_expression_route
registerRoute( new RegExp('/_share-target'), shareTargetHandler, 'POST');

registerRoute( new RegExp(urlPrefix), cachedMediaHandler);
