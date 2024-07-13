//INFO: toda la API aqui para poder desarrollar SIN SW primero pero despues usarla desde ahi

//S: API { **************************************************
import { genKeypairSign, exportKey } from 'src/svc/crypto';
//import { fsp } from '../src/svc/git'
const fsp= {}; //XXX

const shareTargetHandler = async ({event}) => {
  if (broadcastChannel) { broadcastChannel.postMessage('Saving media locally...'); }

  const formData = await event.request.formData();
  const mediaFiles = formData.getAll('media');
	console.log("_share_target",[... formData.keys() ]);
	try {
		await fsp.init();
		try { fsp.mkdir('/up') } catch (ex) { console.log("fsp mkdir",ex) } ;
		console.log("shareTargetHandler fsp init OK");
	} catch(ex) {
		console.log("shareTargetHandler fsp init ERROR",ex);
	}

  for (const mediaFile of mediaFiles) {
		console.log("MEDIA FILE", mediaFile.name);
    if (!mediaFile.name) { // TODO: come up with a  default name for each possible MIME type.
      if (broadcastChannel) { broadcastChannel.postMessage('Sorry! No name found on incoming media.'); }
      continue;
    }

		try {
			await	fsp.writeFile('/up/'+mediaFile.name, mediaFile);
			console.log("shareTargetHandler fsp OK")
		} catch (ex) {
			console.log("shareTargetHandler fsp",ex)
		}

  }

  // Use the MIME type of the first file shared to determine where we redirect.
	const routeToRedirectTo = null; //XXX: let app decide and inform user
	const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/paui/'; //XXX:HC

	return Response.redirect(redirectionUrl, 303); //A: After the POST succeeds, redirect to the main page.
};

const uploadedHandler = async ({url, request, event, params}) => {
	if (url.pathname.endsWith('/up')) {
		let r= ['EMPTY']; //DFTL
		try {r= await fsp.readdir('/up');} catch(ex) {console.log("fsp readDir ERROR",ex)}
		return new Response(r.join('\n'));
	} else {
		let p= (url.pathname.match(/\/up.*/)||[])[0]
		let f= await fsp.readFile(p);
		return new Response(f);
	}
};

const api_registerRoutes= (registerRoute) => {
	registerRoute( new RegExp('/_share-target'), shareTargetHandler, 'POST');
	registerRoute( new RegExp('/up(/.*)?'), uploadedHandler);
}

const api_onmessage= async (event) => {
	let r= null;
	if (event.data?.cmd=='pubkey') { console.log("PK");
		let kp= await genKeypairSign(); console.log({kp});
		let pk= await exportKey(kp.publicKey); console.log({pk})
		r= {kp: ['pubkey','x'], v: pk}
	}
	console.log("MSG R", r, event.source!=null, event);
	return r;
}
//S: API } **************************************************

export { api_registerRoutes, api_onmessage }
