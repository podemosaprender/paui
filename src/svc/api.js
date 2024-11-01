//INFO: toda la API aqui para poder desarrollar SIN SW primero pero despues usarla desde ahi

const DBG= 0;

const channelName= 'messages';
const cacheName= 'media';
const urlPrefix= '/_media/';

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel(channelName) : null;
broadcastChannel.postMessage('API starting')

//S: API { **************************************************
import { genKeypairSign, exportKey, importKey, sign } from 'src/svc/crypto';
import { fsp, clone } from 'src/svc/git'

if (DBG>1) {
	self.xfsp= fsp;
}

const ensure_dir= async (path, dirSeen= {}, length_delta=0) => { //U: mkdir -p ; length_delta=1 to stop before filename
	let parts= path.split('/'); 
	for (let i=1, cur=''; i<(parts.length - length_delta); i++) { cur+='/'+parts[i];
		if (! dirSeen[cur]) {
			try { await fsp.mkdir(cur) } catch (ex) { DBG>7 && console.log("fsp mkdir maybeOK",cur,path,ex) } ;
			dirSeen[cur]= 1;
		}
	}
	return dirSeen;
}

const _key_for= async (id='k',t='.pub') => { //U: crear y guardar keypairs
	let keypath=`/_SEC/${id}`;
	let loadk; try { loadk= await fsp.readFile(keypath+t,'utf8'); }catch(ex){DBG>7 && console.log("fsp read maybe OK",id,t,ex) }
	if (!loadk) {
		let kp= await genKeypairSign(); DBG>7 && console.log({kp});
		let privk= await exportKey(kp.privateKey); DBG>7 && console.log({privk});
		let pubk= await exportKey(kp.publicKey); DBG>7 && console.log({pubk})
		try { await fsp.mkdir('/_SEC') }catch(ex){DBG>7 && console.log("fsp mkdir _SEC maybe OK",ex)}
		await fsp.writeFile(keypath+'.pub', pubk);
		await fsp.writeFile(keypath, privk);
		loadk= t!='' ? pubk : privk;
		console.log("KEYS CREATED AND WRITTEN", keypath);
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

const fsWriteHandler= async ({url, eventOrKV, noResponse}) => {
	let pfx= (url.pathname.match(/\/up\/(.*)/)||[])[1]||'' //A: remove prefix dir eg in gitpages //XXX:PFX

	const formData = Array.isArray(eventOrKV.media) ? null : await event.request.formData();
	const mediaFiles = (formData ? formData.getAll('media') : eventOrKV.media);
	const path= (formData ? formData.get('path') : eventOrKV.path ) || pfx || ''; //XXX:PFX?
	DBG>7 && console.log("fsWriteHandler path",path,pfx,url);

	const dirSeen= {}
	let dst= '/up/'+path+'/'; //XXX:PFX
	await ensure_dir(dst, dirSeen);	

  for (const mediaFile of mediaFiles) {
		DBG>7 && console.log("MEDIA FILE", mediaFile);
    if (!mediaFile.name) { //TODO: come up with a  default name for each possible MIME type.
      continue;
    }

		let fpath= dst + mediaFile.name;
		//DBG: console.log("fsWriteHandler fpath",fpath);
		try {
			await ensure_dir(fpath, dirSeen, 1); //A: mkdir for everything before filename
			//DBG: console.log("fsWriteHandler ensure_dir OK",fpath);
			await	fsp.writeFile(fpath, mediaFile);
			//DBG: console.log("fsWriteHandler fsp OK",fpath)
		} catch (ex) { console.log("fsWriteHandler fsp ERROR",dst, mediaFiles.name,fpath,ex) }
  }

	const routeToRedirectTo = null; //XXX: let app decide and inform user
	const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/'; //XXX:HC

	return noResponse ? true : Response.redirect(redirectionUrl, 303); //A: After the POST succeeds, redirect to the main page.
};

const fsReadHandler = async ({url, noResponse}) => {
	let r= "ERROR"; //DFLT
	let p= (url.pathname.match(/\/up.*/)||['/up/'+url.pathname])[0] //A: ensure prefix dir
	try {
		let stat= await fsp.stat(p);
		DBG>7 && console.log("fsReadHandler STAT",p,stat);
		if (stat.isDirectory()) {
			DBG>7 && console.log("fsReadHandler isDir",p,stat);
			let rdir= ['EMPTY']; //DFTL
			try {
				let names= await fsp.readdir(p);
				rdir= {}
				await Promise.all(names.map(async (n) => {
					let d= await fsp.stat(p+'/'+n);
					rdir[n]= {name: n, type: d.type, size: d.size, mtimeMs: d.mtimeMs, ctimeMs: d.ctimeMs, isSymlink: d.isSymbolicLink()}
				}));
			} catch(ex) {console.log("fsReadHandler readDir ERROR",p,ex)}
			r= JSON.stringify(rdir);
		} else {
			r= await fsp.readFile(p);
		}
	} catch (ex) { r= 'fsReadHandler ERROR: '+ex; console.log('fsReadHandler ERROR 2',p,ex); }
	if (typeof(r)=='string' && r=='ERROR') { r="fsReadHandler ERROR: can't read "+p }
	return noResponse ? r : new Response(r);
};

const fsRmHandler= async ({url, eventOrKV, noResponse}) => {
  if (broadcastChannel) { broadcastChannel.postMessage('fsp saving'); }

	let p= (url.pathname.match(/\/up\/(.*)/)||[])[1]||'' //A: remove prefix dir eg in gitpages

	const formData = Array.isArray(eventOrKV.media) ? null : await event.request.formData();
	const path= (formData ? formData.get('path') : eventOrKV.path ) || p || '';
	const mediaFiles = (formData ? formData.getAll('media') : eventOrKV.media);
	DBG>7 && console.log("fsRmHandler",path);

	const dst= '/up/'+path+'/';
  for (const mediaFile of mediaFiles) {
		DBG>7 && console.log("MEDIA FILE", mediaFile.name);
    if (!mediaFile.name) { // TODO: come up with a  default name for each possible MIME type.
      if (broadcastChannel) { broadcastChannel.postMessage('Sorry! No name found on incoming media.'); }
      continue;
    }

		try {
			let fpath=dst+mediaFile.name;
			await	fsp.unlink(fpath);
			DBG>7 && console.log("fsRmHandler fsp OK",fpath)
		} catch (ex) { console.log("fsRmHandler fsp",dst, mediaFiles.name,fpath,ex) }
  }

  // Use the MIME type of the first file shared to determine where we redirect.
	const routeToRedirectTo = null; //XXX: let app decide and inform user
	const redirectionUrl = routeToRedirectTo ? `/#${routeToRedirectTo.href}` : '/'; //XXX:HC

	return noResponse ? true : Response.redirect(redirectionUrl, 303); //A: After the POST succeeds, redirect to the main page.
};

const api_registerRoutes= (registerRoute) => {
	registerRoute( new RegExp('/up(/.*)?'), fsReadHandler);
	registerRoute( new RegExp('/up(/.*)?'), fsWriteHandler, 'POST');
	registerRoute( new RegExp('/_share-target'), fsWriteHandler, 'POST');
}

const ApiCmd_= {};
ApiCmd_.key_pub= (kname) => _key_for(kname,'.pub')
ApiCmd_.key_sign= _sign; //XXX:SEC
ApiCmd_.git_clone= clone;
ApiCmd_.get_file= fsReadHandler
ApiCmd_.set_file= fsWriteHandler
ApiCmd_.rm_file= fsRmHandler

const api_onmessage= async (event) => {
	let {cmd,args,reqId}= event.data || {cmd:'UNKNOWN'};
	args= args || [];
	let r= 'ERROR UnknownCmd '+cmd; //DFLT
	try {
		let h= ApiCmd_[cmd]; if (h) { 
			r= h(...args);
			if (r instanceof Promise) { r= await r; }
		}
	} catch (ex) { r= 'ERROR!!! '+ex; console.error("api_onmessage",ex);}
	DBG>7 && console.log("MSG R", r, event.source!=null, Object.keys(ApiCmd_), event);
	return { kp: [cmd, ...args], v: r, reqId }
}
//S: API } **************************************************

//S: CLIENT { ************************************************
var Worker_;
const apic_worker= () => { //A: return serviceWorker if available, init regular worker if not
	if (false && navigator.serviceWorker.controller) { //XXX:ANDROID FAILS?
		return navigator.serviceWorker.controller;
	} else {
		if (! Worker_) {
			Worker_= new Worker(new URL('./sw-nonpwa.js', import.meta.url), { type: 'module', })
			self.xwk= Worker_;
		}
		return Worker_;
	}
}


const listeners_= {};
const swOnMessage_= (m) => { DBG>7 && console.log("API swOnMessage_",m);
	Object.values(listeners_).forEach( cb => { try{ cb(m) }catch(ex){}} )
}
const apic_set_listener= (k,cb) => { 
	apic_worker().onmessage= swOnMessage_; //A:idempotent
	if (cb) { listeners_[k]= cb; }
	else { delete listeners_[k]; }
}

let ListenerIdCnt_= 1;
const apic_call= (cmd, args, cb, listenerId) => {
	let listenerIdOk= listenerId || ('tmp__'+cmd+'__'+(ListenerIdCnt_++));
	let rp= new Promise( (onOk, onErr) => {
		apic_set_listener(listenerIdOk, (apir) => {try{
			let reqId= apir?.data?.reqId || '';
			//DBG: console.log("apic_call RET",reqId, listenerIdOk, apir);
			if (reqId==listenerIdOk) { //A: for us
				if (listenerIdOk.startsWith('tmp__')) apic_set_listener(listenerIdOk,null); //A: not permanent, delete from listeners
				let data= apir.data.v;
				if (cb) { try{ cb(data) }catch{} };
				onOk(data);
			}
		}catch(ex){console.log("apic_call RET handler ERROR",ex)}})
	});	
	//DBG: console.log("apic_call SEND",{cmd,args})
	apic_worker().postMessage({cmd,args,reqId: listenerIdOk}); 
	return rp;
}

const apic_upload= async (name2bytes, path='') => {
	let fd= {media:[]}
	Object.entries(name2bytes).forEach( ([n,s]) => {
		let f= s instanceof File ? s : new File([s],n)
		DBG>7 && console.log("apic_upload",n,f);
		fd.media.push( f );
	})
	let r= await apic_call('set_file',[{url:{pathname: '/up/'+path}, eventOrKV: fd, noResponse: true}]);
	return r;
}

const apic_set_file= async(fpath,content) => {
	return await apic_upload({[fpath]: content},'/');
}
const apic_rm_file= async (fpath) => (await apic_call('rm_file', [{url:{pathname: ''}, eventOrKV: {media:[{name: fpath}]}, noResponse: true}]))

const apic_get_file_impl_= async (fpath) => (
	(await apic_call('get_file', [{url:{pathname: fpath}, noResponse: true}]))
);
const apic_get_file= async (fpath) => (await apic_get_file_impl_(fpath).then(r=> (r.text ? r.text() : r)))
const apic_get_file_blob= async (fpath) => (await apic_get_file_impl_(fpath)) //A: File <= Blob
//S: CLIENT } ************************************************

export { 
	//COMMON
	broadcastChannel, 
	
	//SERVICE
	api_registerRoutes, api_onmessage,
	cacheName, channelName, urlPrefix,
	
	//CLIENT
	apic_upload, apic_set_file, apic_get_file, apic_get_file_blob, apic_rm_file,
	apic_set_listener, apic_call,
}
