//INFO: toda la API aqui para poder desarrollar SIN SW primero pero despues usarla desde ahi

const cacheName= 'media';
const channelName= 'messages';
const urlPrefix= '/_media/';

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel(channelName) : null;
broadcastChannel.postMessage('startting')

//S: API { **************************************************
import { genKeypairSign, exportKey, importKey, sign } from 'src/svc/crypto';
import { fsp, clone } from 'src/svc/git'

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
	let m= {i: "xtest1", ch: 'xtest-s1', k: pubk_s.substr(0,32), t: new Date().toJSON(), d: msg }; //XXX:params!
	let signed= await sign(m, privk)
	console.log("SIGNED",signed);
	return signed;
}

const fsWriteHandler= async ({url, request, event, params}) => {
  if (broadcastChannel) { broadcastChannel.postMessage('fsp saving'); }

	let p= (url.pathname.match(/\/up\/(.*)/)||[])[1]||'' //A: remove prefix dir eg in gitpages

  const formData = await event.request.formData();
	const path= formData.get('path') || p || '';
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
			console.log("fsWriteHandler fsp OK",fpath)
  		if (broadcastChannel) { broadcastChannel.postMessage('fsp saved '+fpath); }
		} catch (ex) { console.log("fsWriteHandler fsp",dst, mediaFiles.name,fpath,ex) }
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
	registerRoute( new RegExp('/up(/.*)?'), fsReadHandler);
	registerRoute( new RegExp('/up(/.*)?'), fsWriteHandler, 'POST');
	registerRoute( new RegExp('/_share-target'), fsWriteHandler, 'POST');
}

const ApiCmd_= {};
ApiCmd_.key_pub= (kname) => _key_for(kname,t='.pub')
ApiCmd_.key_sign= _sign; //XXX:SEC
ApiCmd_.git_clone= clone;

const api_onmessage= async (event) => {
	let {cmd,args,reqId}= event.data || {cmd:'UNKNOWN'};
	args= args || [];
	let r= 'ERROR UnknownCmd '+cmd; //DFLT
	try {
		let h= ApiCmd_[cmd]; if (h) { 
			r= h(...args);
			if (r instanceof Promise) { r= await r; }
		}
	} catch (ex) { r= 'ERROR!!! '+ex; }
	console.log("MSG R", r, event.source!=null, Object.keys(ApiCmd_), event);
	return { kp: [cmd, ...args], v: r, reqId }
}
//S: API } **************************************************

//S: CLIENT { ************************************************
const apic_upload= async (name2bytes, path='') => {
	let fd= new FormData()
	Object.entries(name2bytes).forEach( ([n,s]) => fd.append('media', new File([s],n)))
	let r= await fetch('./up/'+path, {method: 'POST', body: fd}).then(r => r.text())
	return r;
}

const apic_set_file= async(fpath,content) => {
	let p= fpath.split('/'), n= p.pop(), path= p.join('/');
	return await apic_upload({[n]: content},path);
}

const apic_get_file= async (fpath) => (await fetch('/up/'+fpath).then(r=>r.text()))
const apic_get_file_blob= async (fpath) => (await fetch('/up/'+fpath).then(r=>r.blob()))

const listeners_= {};
const swOnMessage_= (m) => { console.log("API onSWMessage_",m);
	Object.values(listeners_).forEach( cb => { try{ cb(m) }catch(ex){}} )
}
const apic_set_listener= (k,cb) => { 
	navigator.serviceWorker.onmessage= swOnMessage_; //A:idempotent
	if (cb) { listeners_[k]= cb; }
	else { delete listeners_[k]; }
}

let ListenerIdCnt_= 1;
const apic_call= (cmd, args, cb, listenerId) => {
	let listenerIdOk= listenerId || (cmd+'__'+(ListenerIdCnt_++));
	let rp= new Promise( (onOk, onErr) => {
		apic_set_listener(listenerIdOk, (apir) => {
			if (!listenerId) apic_set_listener(listenerIdOk,null); //A:no id=not permanent, delete from listeners
			if (cb) { try{ cb(apir) }catch{} };
			onOk(apir);
		})
	});	
	navigator.serviceWorker.controller.postMessage({cmd,args,listenerIdOk}); 
	return rp;
}
//S: CLIENT } ************************************************

export { 
	//COMMON
	broadcastChannel, 
	
	//SERVICE
	api_registerRoutes, api_onmessage,
	cacheName, channelName, urlPrefix,
	
	//CLIENT
	apic_upload, apic_set_file, apic_get_file, apic_get_file_blob,
	apic_set_listener, apic_call,
}
