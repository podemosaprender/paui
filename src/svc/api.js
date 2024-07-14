//INFO: toda la API aqui para poder desarrollar SIN SW primero pero despues usarla desde ahi

//S: API { **************************************************
import { genKeypairSign, exportKey, importKey, sign } from 'src/svc/crypto';
import { fsp } from 'src/svc/git'

const cacheName= 'media';
const channelName= 'messages';
const urlPrefix= '/_media/';

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel(channelName) : null;
broadcastChannel.postMessage('startting')

const ensure_dir= async (path) => {
	let parts= path.split('/'); 
	for (let i=1, cur=''; i<parts.length; i++) { cur+='/'+parts[i];
		try { await fsp.mkdir(cur) } catch (ex) { console.log("fsp mkdir maybeOK",cur,path, ex) } ;
	}
}

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
	let m= {i: "xtest1", k: pubk_s.substr(0,32), t: new Date().toJSON(), ch: 'xtest-s1', d: msg } //XXX:params!
	let signed= await sign(m, privk)
	console.log("SIGNED",signed);
	return signed;
}

const shareTargetHandler = async ({event}) => {
  if (broadcastChannel) { broadcastChannel.postMessage('fsp saving'); }

  const formData = await event.request.formData();
	const path= formData.get('path') || '';
  const mediaFiles = formData.getAll('media');
	console.log("_share_target",path,[... formData.keys() ]);

	const dst= '/up/'+path+'/';
	await ensure_dir(dst);	

  for (const mediaFile of mediaFiles) {
		console.log("MEDIA FILE", mediaFile.name);
    if (!mediaFile.name) { // TODO: come up with a  default name for each possible MIME type.
      if (broadcastChannel) { broadcastChannel.postMessage('Sorry! No name found on incoming media.'); }
      continue;
    }

		try {
			let fpath=dst+mediaFile.name;
			await	fsp.writeFile(fpath, mediaFile);
			console.log("shareTargetHandler fsp OK",fpath)
  		if (broadcastChannel) { broadcastChannel.postMessage('fsp saved '+fpath); }
		} catch (ex) { console.log("shareTargetHandler fsp",dst, mediaFiles.name,fpath,ex) }
  }

  // Use the MIME type of the first file shared to determine where we redirect.
	const routeToRedirectTo = null; //XXX: let app decide and inform user
	const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/'; //XXX:HC

	return Response.redirect(redirectionUrl, 303); //A: After the POST succeeds, redirect to the main page.
};

const fsReadHandler = async ({url, request, event, params}) => {
	let p= (url.pathname.match(/\/up.*/)||[])[0] //A: remove prefix dir eg in gitpages
	try {
		let stat= await fsp.stat(p);
		if (stat.isDirectory()) {
			let r= ['EMPTY']; //DFTL
			try {
				let names= await fsp.readdir(p);
				r= {}
				await Promise.all(names.map(async (n) => {
					let d= await fsp.stat(p+'/'+n);
					r[n]= {name: n, type: d.type, size: d.size, mtimeMs: d.mtimeMs, ctimeMs: d.ctimeMs, isSymlink: d.isSymbolicLink()}
				}));
			} catch(ex) {console.log("fsReadHandler readDir ERROR",p,ex)}
			return new Response(JSON.stringify(r));
		} else {
			let f= await fsp.readFile(p);
			return new Response(f);
		}
	} catch (ex) {return new Response('fsReadHandler ERROR: '+ex);}
	return new Response("fsReadHandler ERROR: can't read "+p);
};

const api_registerRoutes= (registerRoute) => {
	registerRoute( new RegExp('/_share-target'), shareTargetHandler, 'POST');
	registerRoute( new RegExp('/up(/.*)?'), fsReadHandler);
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

export { 
	api_registerRoutes, api_onmessage,
	broadcastChannel, cacheName, channelName, urlPrefix,
}
