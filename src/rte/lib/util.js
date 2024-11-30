//INFO: utilidades generales 

//S: basicos *************************************************
export function logmsg(msg, data) {
	const dataOk= typeof(data)=='function' ? data() : data;
	console.log(msg, JSON.stringify(dataOk, null,2));
	alert(msg);
}

export function logmex(t,l,msg,data, ex) {
	logmsg([t,l,msg, ex+''].join(':'), data)
}

export const nop= (state) => state //U: no cambia nada

//S: arrays y objetos, set_p *********************************
const P_SEP_RE= /([^A-Za-z0-9_\.+\$-])/;
function parse_p(p, sepRe) { return p.split(sepRe || P_SEP_RE).slice(1); }
function get_p_impl(dst,p,wantsCreate,max,sepRe) { //U: trae un valor en un "path" de kv/arrays anidados
	var parts= Array.isArray(p) ? p : parse_p(p,sepRe);
	if (parts.length && parts[parts.length-1]=="") { parts.pop(); }
	//DBG: console.log("get_p_impl parts",parts);
	//A: p empieza con un separador 
	dst= dst!=null ? dst : wantsCreate ? (parts[0]=="[" ? [] : {} ) : null;
	max= max||0;
	var dstp= dst;
	for (var i=1; dstp!=null && i<parts.length-max; i+=2)  { var k= parts[i]; var t= parts[i+1]; 
		//DBG logm("DBG",1,"LIB set_p",{k: k, t: t, i: i, dstp: dstp});
		var x= dstp[k];
		if (x==null && wantsCreate && i<parts.length-1) { x= dstp[k]= (t=="[" ? [] : {} ); }
		dstp= x; 
	}
	//A: dstp tiene el objeto donde hay que poner el valor
	//DBG logm("DBG",1,"LIB set_p",{p: p, dstp: dstp});
	return [dstp,dst];
}

export function get_p(dst,p,wantsCreate,sepRe) { //U: trae un valor en un "path" de kv/arrays anidados
	return get_p_impl(dst,p,wantsCreate,null,sepRe)[0];
}

export function set_p(dst,p,v,wantsIfNotSet,sepRe) { //U: pone un valor en un "path" de kv/arrays anidados
	var parts= Array.isArray(p) ? p : parse_p(p,sepRe);
	//A: p empieza con un separador => parts[0] se ignora, parts[i] es tipo, parts[i+1] clave
	var dd= get_p_impl(dst,p,1,1,sepRe);	
	var dstp= dd[0];
	if (typeof(dstp)!='object') { //A: si no habia un kv
		dstp= {}	
		dd[1]= set_p(dd[1],parts.slice(0,parts.length-2),dstp,false,sepRe);
	}
	//DBG logm("DBG",1,"LIB set_p",{p: p, dstp: dstp});
	try {
		var k= parts[parts.length-1];
		if (wantsIfNotSet && dstp[k]!=null) { }
		else { if (k=="+") {dstp.push(v)} else if (k=="-") {dstp.unshift(v)} else { dstp[k]= v; } }
	} catch (ex) { logmex("ERR",1,"set_p",{dst: dst,p:p,parts:parts,dstp: dstp},ex) }

	return dd[1];
}

export function set_p_all(dst,kv) { dst= dst || {}; //U: kv= path->v
	fold(kv,function (v,k) { set_p(dst,k,v); }); 
	return dst;
}

export function ser_p_kv(x,pfx,out_kv={},sep_kv='{',sep_l='[' ) {
	if (Array.isArray(x)) { x.forEach( (e,i) => ser_p_kv(e,pfx+sep_l+i, out_kv,sep_kv,sep_l ) ) }
	else if (typeof(x)=="object" && x!=null) { Object.entries(x).forEach( ([k,v]) => ser_p_kv(v,pfx+sep_kv+k, out_kv,sep_kv,sep_l) ) }
	else { out_kv[pfx]= x }
	return out_kv
}

//S: arrays y objetos, zip, idx *********************************
export const zip_kv= (ks, vs) => Object.assign(... ks.map( (k,i) => ({[k]:vs[i]}) ));
export const sort_kv= (kv) => Object.assign(...Object.keys(kv).sort().map(k => ({[k]:kv[k]})))
export const lol_to_lokv= (lol) => lol.slice(1).map( r => zip_kv(lol[0],r) );
export const lol_to_kvokv= (lol, onErr=null, idCol='id',idxCol='rowidx') => {
	if (Array.isArray(idCol)) { idCol= idCol.find(c => lol[0].indexOf(c)>-1) }
	return lol.slice(1).reduce( (acc,r,idx) => {
		let kv= zip_kv(lol[0],r); kv['rowidx']= idx;
		let id= kv[idCol];
		if (onErr) { let prev= acc[id]; if (prev) { onErr('id-duplicated',{id, idCol, prev}) }}
		acc[id]= kv;
		return acc;
	}, {});
}

export const norm_col= (d, colidx) => d.reduce( (acc,el,idx) => {
	el[colidx].split(/\s*;\s*/).forEach( k0 => {
		let k= k0.replace(/\s+/,' ').trim().toLowerCase(); 
		(acc[k]=(acc[k]||[])).push(idx); 
	});
	return acc;
},{}); 

export const parse_tsv= (src) => {
	let d= src.split(/\r?\n/).map(l => l.split(/\t/))
	return d;
}


//S: web *******************************************************
export const encode_uri= (s) => encodeURIComponent(s).replace(/%20/g,'+');
export const ser_urlparams= (v) => Object.entries(v).map( (kv) => kv.map(encode_uri).join('=') ).join('&');

export const ser_urlparams_r= (queryString) => {
	const estadoInicial= queryString || window.location.search || '';
	const urlSearchParams = new URLSearchParams(estadoInicial);
	const params = Object.fromEntries(urlSearchParams.entries());
	return params;
}


export const mfetch= async (data, url, method) => {
	try {
		const rawResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (rawResponse.ok) {
			const response= await rawResponse.json();
			return response;
		}
		else {
			throw Error(`ERROR fetch '${url}' ${rawResponse.status} ${rawResponse.statusText}`);
		}
	} catch (ex) {
		throw Error(`ERROR fetch '${url}' ${ex.message}`);
	}
}

export function blob_download(blobOrString,name) {
	const blob= typeof(blobOrString)=="string" ? new Blob([blobOrString]) : blobOrString;
	const link= document.createElement('a');
	link.download = name || 'download.dat';
	link.href = URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href);
}


