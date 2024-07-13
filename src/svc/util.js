//INFO: funciones que usamos siempre
//XXX:const fs = require("fs");

function ensure_kv(kvOrArray) { 
	return Array.isArray(kvOrArray) ? Object.assign({},...kvOrArray.map(o => ({[o]: o}))) : kvOrArray 
};

function ser(object_or_str) {
	return typeof(object_or_str)=='string' ? '\t'+object_or_str : JSON.stringify(object_or_str);
}

function ser_r(s) {
	return s.startsWith('\t') ? s.substr(1) : JSON.parse(s);
}

function uint8ArrayToStr( bytes ) {
	let binary = ''; const len = bytes.byteLength;
	for (var i = 0; i < len; i++) { binary += String.fromCharCode( bytes[ i ] ); }
	return binary
}

function uint8ArrayToStr_r(binstr) { //U: ojo Encoder es UTF8 no bytes!
	return Uint8Array.from(binstr.split('').map(c => c.charCodeAt(0))) 
}

const enc_b64u= (x) => globalThis.btoa(
	x instanceof Uint8Array ? uint8ArrayToStr(x) :
	x instanceof ArrayBuffer ? uint8ArrayToStr(new Uint8Array(x)) 
	: x
)
const enc_b64u_r= (s) => globalThis.atob(s)
const fname_safe= (s) => s.replace(/[^a-z0-9-]/gsi, c => c.charCodeAt(0).toString(16))

const path_abs= (p,root,base) => ((p.startsWith('/') ? root : base+'/')+p);
const dirname = (path) => path.replace(/\/?[^\/]*$/,'')
const ensure_dir= (p,pathIsDir) => { 
	let dirp= pathIsDir ? p : dirname(p);
	if (dirp=='') return;
	fs.existsSync(dirp) || fs.mkdirSync(dirp,{recursive: true});
}

const stdin_json= () => JSON.parse(fs.readFileSync(0, 'utf-8')); 

const set_file= (path,content,noOverwrite) => {
	ensure_dir(path);
	if (noOverwrite && fs.existsSync(path)) {
		if (noOverwrite!='noTouch') { return 'no-overwrite' }
		if (noOverwrite=='noTouch') {
			let cur= fs.readFileSync(path,'utf8');
			if (cur==content+'') { return 'unchanged' }
		}
	}
	fs.writeFileSync(path,content); 
	return 'written';
}

const get_file= (path,enc='utf8') => fs.readFileSync(path,enc);
const get_file_newer= (path,age_max,enc='utf8') => {
	let age; try { age= (Date.now() - fs.statSync(path).mtime.getTime())/1000 } catch(ex) {}
	r = (age < age_max) ? fs.readFileSync(path,enc) : null;
	//DBG: console.log("get_file_newer",{path,age,age_max,rNotNull: r!=null})
	return r;
}


export {	fname_safe, path_abs, ensure_dir, stdin_json, 
	set_file, get_file, get_file_newer, dirname, 
	ensure_kv, enc_b64u, enc_b64u_r, uint8ArrayToStr, uint8ArrayToStr_r,
	ser, ser_r,
}

