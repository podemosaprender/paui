//INFO: toda la API aqui para poder desarrollar SIN SW primero pero despues usarla desde ahi

//S: API { **************************************************
import { genKeypairSign, exportKey, importKey, sign } from 'src/svc/crypto';
import { fsp } from 'src/svc/git'

const _key_for= async (id='k',t='.pub') => { //U: crear y guardar keypairs
	let keypath=`/_SEC/${id}`;
	let loadk; try { loadk= await fsp.readFile(keypath+t,'utf8'); }catch(ex){console.log("fsp read maybe OK",id,t,ex) }
	if (!loadk) {
		let kp= await genKeypairSign(); console.log({kp});
		let privk= await exportKey(kp.privateKey); console.log({privk});
		let pubk= await exportKey(kp.publicKey); console.log({pubk})
		try { await fsp.mkdir('/_SEC') }catch(ex){console.log("fsp mkdir _SEC maybe OK",ex)}
		await fsp.writeFile(keypath+'.pub', pubk);
		await fsp.writeFile(keypath, privk);
		loadk= t!='' ? pubk : privk;
		console.log("KEYS CREATED AND WWITTEN", keypath);
	} else { console.log("KEYS LOADED", keypath); }
	return loadk;
}

const _sign= async (msg,id) => {
	let pubk_s= await _key_for(id);
	let privk_s= await _key_for(id,'');
	let privk= await importKey(privk_s,['sign']);
	let m= {i: "xtest1", k: pubk_s.substr(0,32), t: new Date().toJSON(), ch: 'xtest-s1', d: msg }
	let signed= await sign(m, privk)
	console.log("SIGNED",signed);
	return signed;
}

const shareTargetHandler = async ({event}) => {
  if (broadcastChannel) { broadcastChannel.postMessage('Saving media locally...'); }

  const formData = await event.request.formData();
  const mediaFiles = formData.getAll('media');
	console.log("_share_target",[... formData.keys() ]);
	try {
		try { await fsp.mkdir('/up') } catch (ex) { console.log("fsp mkdir",ex) } ;
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
	try {
		if (event.data?.cmd=='pubkey') { console.log("PK");
			let pubk= await _key_for('k');
			r= {kp: ['pubkey','x'], v: pubk}
		} else if (event.data?.cmd=='sign') { console.log("SIGN");
			r= await _sign(...event.data.args);
		}
	} catch (ex) { r= 'ERROR!!! '+ex; }
	console.log("MSG R", r, event.source!=null, event);
	return r;
}
//S: API } **************************************************

export { api_registerRoutes, api_onmessage }
