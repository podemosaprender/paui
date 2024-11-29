import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { apic_get_file, apic_set_file, apic_upload, apic_get_file_blob } from 'src/svc/api';
import { new_zip_model } from 'src/svc/zip';
import { blob_download } from 'src/rte/lib/util';
import slugify from 'slugify';


const PFX='/aa/xyaml';

//XXX:LIB { U: procesar planilla/tsv

const zip_kv= (ks, vs) => Object.assign(... ks.map( (k,i) => ({[k]:vs[i]}) ));
const sort_kv= (kv) => Object.assign(...Object.keys(kv).sort().map(k => ({[k]:kv[k]})))
const lol_to_lokv= (lol) => lol.slice(1).map( r => zip_kv(lol[0],r) );
const lol_to_kvokv= (lol, onErr=null, idCol='id',idxCol='rowidx') => {
	if (Array.isArray(idCol)) { idCol= idCol.find(c => lol[0].indexOf(c)>-1) }
	return lol.slice(1).reduce( (acc,r,idx) => {
		let kv= zip_kv(lol[0],r); kv['rowidx']= idx;
		let id= kv[idCol];
		if (onErr) { let prev= acc[id]; if (prev) { onErr('id-duplicated',{id, idCol, prev}) }}
		acc[id]= kv;
		return acc;
	}, {});
}

const norm_col= (d, colidx) => d.reduce( (acc,el,idx) => {
	el[colidx].split(/\s*;\s*/).forEach( k0 => {
		let k= k0.replace(/\s+/,' ').trim().toLowerCase(); 
		(acc[k]=(acc[k]||[])).push(idx); 
	});
	return acc;
},{}); 

const parse_tsv= (src) => {
	let d= src.split(/\r?\n/).map(l => l.split(/\t/))
	return d;
}

const get_file_tsv= async (apath) => {
	let src= await apic_get_file(apath)
	return parse_tsv(src);
}

const on_norm_tsv= async () => {
	return get_file_tsv('prod.tsv')
}

window.slugify= slugify;
window.ser= (o) => JSON.stringify((typeof(o)=="object" && !Array.isArray(o)) ? sort_kv(o) : o,0,2);
window.get_file_tsv= get_file_tsv;
window.on_norm_tsv= on_norm_tsv;
window.norm_col= norm_col;
//XXX:LIB } U: procesar planilla/tsv

//XXX:LIB { U: planilla google
const get_http= async (url,fp) => {
	let urlPx= 'https://proxy.o-o.fyi/' + url.replace(/^https?:\/\//,''); //encodeURIComponent(url);
	let x= await fetch(urlPx).then(r => r.blob())
	apic_set_file(fp,x);
	console.log("saved "+fp);
}
window.get_http= get_http;

const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vSA4XW7aPv5E7QOpMYk1vYuk_DY3xtbG4TY-oWomKojuaeJh4apwF1PfTx6ElQe7AQIvD0egAH33lWs/pub?gid=1828880156&single=true&output=tsv'
const get_tsv= async () => {
	let x= await fetch(url).then(r => r.text())
	await apic_set_file('links.tsv',x);
	console.log("saved links.tsv",x);
	let links_data= parse_tsv(x);
	await Promise.all(links_data.slice(1).map( async r => {
		if (r[0]!='links' && r[1].startsWith('http')) {
			console.log("download",r);
			return await get_http(r[1],'ries_'+r[0]);
		}
	}));
}

const zip_url='https://drive.usercontent.google.com/download?id=1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW&export=download&authuser=0' //FROM browser 'https://drive.google.com/file/d/1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW/view?usp=sharing'

const get_zip= async () => {
	await get_http(zip_url,'xz1.zip')
}

//XXX:LIB }

//YAML {
import yaml from 'js-yaml';
window.yaml= yaml;
window.apic_get_file= apic_get_file;

import { ser_p_kv } from 'src/rte/lib/util';
window.ser_p_kv= ser_p_kv;

async function yaml_dir_to_kv(path='', onFile) {
	let ff= JSON.parse(await apic_get_file(path))
	await Promise.all(
		Object.keys(ff)
			.filter(fname => fname.endsWith('.yaml'))
			.map(async (fname) => await onFile( fname, yaml.load(await apic_get_file(path+'/'+fname))) )
	);
}

async function on_generate_tsv() {
	let s='';
	let hdr= null;
	await yaml_dir_to_kv(PFX+'/pj', async (fname, kv) => {
		const flat= ser_p_kv(kv,'');
		if(!hdr) { hdr= Object.keys(flat); s+='fname\t'+hdr.join('\t')+'\n'; }
		s+= fname+'\t'+ hdr.map(k => ((flat[k]||'')+'').replace(/\r?\n/g,'\\n')).join('\t')+'\n';
	});
	//DBG: console.log("SEE xout"); window.xout= s;
	blob_download(s,'xpj1.tsv');
}
const on_generate_html_impl= async (forEachProj) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
	const tpl_src= await apic_get_file('tpl_proj.html');
	const tpl_lol= parseJinjaLike(tpl_src)
	console.log("TPL_LOL",tpl_lol);
	const zip= new_zip_model();
	let i=0;
	await forEachProj( async (p) => {
		if (true || p.id=="1716") { //XXX:DBG
			let s= tpl_expand(tpl_lol.all[2],{pj: p});
			let r= await zip.addFile(new File([s],p.id+''+'.html'));
			if (i++ % 100==0) console.log(i);
			return r;
		}
	});
	blob_download(await zip.getBlob(),'xhtml_proj.zip');
};

const forEachProj_tsv= async (cb) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
	let rels= {
		'proy': {pfx:'ries_'},
		'pub': {pfx:'ries_'},
		'personas':{pfx:'ries_'},
		'clasificaciones':{pfx:'ries_',idCol:'id'},
		'financiamientos':{},
		'instituciones':{},
		'regiones_educativas':{},
		'tipos_de_productos':{},
		'cpres':{},
		'gestion':{},
	}

	let D= {};
	await Promise.all(Object.entries(rels).map( async ([k,def]) => {
		let on_err= (t,d) => console.log('ERROR',k,t,d,def);	
		D[k]= lol_to_kvokv( await get_file_tsv((def.pfx || 'aa/xyaml/data/')+k+'.tsv'), on_err,(def.idCol || ['slug','sigla','id']) );
		window[k]= D[k];
	}))

	const expand_rel= (p,k,col,t) => {
		let vs= p[k] && p[k].split(/\s*;\s*/).map(s=>s.trim()).filter(x=>x);
		if (vs && vs.length) {
			let find_one= (vk) => { 
				let v2= D[col][vk]; 
				if (v2==null) { console.log('FALTA',vk,col,k,p.id,p.rowidx); }
				return v2;
			};
			p[k+'_ori']=p[k];
		p[k]= t=='*' ? vs.reduce( (acc, vk) => {acc[vk]= find_one(vk); return acc}, {})
								 : find_one(vs[0])
		}
	}

	Object.values(D.clasificaciones).forEach(c => { c.lvl= (c.id.length>1) ? 'sub_' : '' });

	Object.values(D.proy).forEach(p => {
		expand_rel(p,'director','personas','1');	
		expand_rel(p,'instituciones','instituciones','1');	
		expand_rel(p,'regiones_educativas','regiones_educativas','1');	
		expand_rel(p,'cpres','cpres','1');	
		expand_rel(p,'gestion','gestion','1');	
		expand_rel(p,'integrantes','personas','*');	
		expand_rel(p,'financiamientos','financiamientos','*');	
		p.clasificaciones= p.clasificaciones && p.clasificaciones.replace(/(\d)([a-z])/g,'$1 ; $1$2'); //XXX:hack horrible para incluir tema si hay subtema!
		expand_rel(p,'clasificaciones','clasificaciones','*');	
		p.publicaciones= {};
	});

	Object.values(D.pub).forEach(pu => {
		expand_rel(pu,'tipos_de_productos','tipos_de_productos','1');	
		expand_rel(pu,'autores','personas','*');	
		pu.url_adjunto ||= ('/uploads/productos/' + pu.nombre_adjunto);
		let pj_id= pu.id.split(/__/)[0];
		D.proy[pj_id].publicaciones[pu.id]= pu;
	});


	for (let p of Object.values(D.proy)) { await cb(p); }
	//blob_download(new Blob([yaml.dump(D)]),'x.txt')
	
	//alert("on_generate_html")
}

const on_generate_html= async (e) => {
	await on_generate_html_impl(forEachProj_tsv);
}
//YAML }

//XXX:MOVER_A_LIB {
import { parseJinjaLike } from 'src/svc/tplJinjaLike';

import { get_p } from 'src/rte/lib/util.js';
const tpl_expand1= (tpl, kv) => {
	return tpl.replace(/\{\{\s*(.+?)\s*\}\}/gs, (_,ks) => {
		let ksl= ks.trim().trim().split(/\s+or\s+/);
		let r;
		ksl.every( kOrConst => {
			r= kOrConst.startsWith('"') ? kOrConst.replace(/"/g,'') : get_p(kv,'.'+kOrConst,false,/(\.)/);
			return (r==null || r=="");
		});
		return (r===undefined ? ('XXX_MISSING_'+JSON.stringify(ksl).replace(/\W+/g,' ')) : r);
	});
}

const tpl_expand= (tpl, kv) => {
	const DBG=0;
	return tpl.map(cmd => {
		if (Array.isArray(cmd)) { let h= cmd[0];
			if (h=='for') { let [_,colk,names,body]= cmd;
				let col= get_p(kv,'.'+colk,false,/(\.)/);
				DBG && console.log("tpl_expand for",{colk,names},col);
				return ((DBG && `\n\n<!-- ${JSON.stringify(cmd,0,2)} -->\n\n`)||'')+ ( 
					(!col) ? '' :
					( Array.isArray(col) ? col.map( e => { 
							let kv2={}; kv2[names[0]]= e; 
							return (((DBG && `\n\n<!-- ${JSON.stringify(kv2,0,2)} -->\n\n`)||'')+
								 tpl_expand(body, {...kv, ...kv2})
							)
						}) :
						Object.entries(col).map( ([k,v]) => { 
								let kv2={}; kv2[names[0]]= k;  kv2[names[1]]= v;  
								return (((DBG && `\n\n<!-- ${JSON.stringify(kv2,0,2)} -->\n\n`)||'')+
									tpl_expand(body, {...kv, ...kv2})
								)
							})
					).join('')
				);
			} else {
				return `\n\n<!-- TODO:tpl_expand ${JSON.stringify(cmd,0,2)} -->\n\n`
			}
		} else {
			return tpl_expand1(cmd, kv)
		}
	}).join('');
}


window.get_p= get_p;
window.tpl_expand= tpl_expand;
//XXX:MOVER_A_LIB }

//XXX:MOVER_A_LIB {
import { keys_zip, get_file_zip } from 'src/svc/zip';

async function zip_expand() {
	const zb= await apic_get_file_blob('xz.zip')
	const ze= await keys_zip(zb)
	await Promise.all(ze.filter(e => (!e.filename.endsWith('/'))).map( async e => {
		apic_set_file('aa/'+e.filename, await get_file_zip(e))
	}));
}
//XXX:MOVER_A_LIB }

export function Generator() {
	const [path, setPathImpl]= useState('');
	const [files, setFiles]= useState({});
	const toast = useRef(null);


	return (<div>
		<ul>
			<li><Button icon="pi pi-file-export" onClick={zip_expand} />Zip expand xz.zip</li>
			<li><Button icon="pi pi-arrow-down" onClick={get_tsv} />Download Google TSV</li>
			<li><Button icon="pi pi-arrow-down" onClick={get_zip} />Download Google ZIP</li>
			<li><Button icon="pi pi-arrow-left" onClick={on_generate_html} />Generate HTML</li>
			<li><Button icon="pi pi-arrow-left" onClick={on_generate_tsv} />Generate TSV</li>
		</ul>
	</div>)
}
