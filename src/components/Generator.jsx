import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { apic_get_file, apic_set_file, apic_upload, apic_get_file_blob } from 'src/svc/api';
import { new_zip_model } from 'src/svc/zip';
import { blob_download } from 'src/rte/lib/util';


const PFX='/aa/xyaml';

//XXX:LIB { U: planilla google
const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vQdbTUxtm4iXZOwlIag0cvmXZyWil8rcf4tqGDLtW59N2TxyjqrR5jZZbNkQ2tkVA/pub?gid=1259830238&single=true&output=tsv'
const get_tsv= async () => {
	let x= await fetch(url).then(r => r.text())
	apic_set_file('prod.tsv',x);
	alert("saved prod.tsv");
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

const on_generate_html= async (e) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
	const tpl_src= await apic_get_file(PFX+'/tpl/tpl_proj.html');
	const tpl_lol= parseJinjaLike(tpl_src)
	console.log("TPL_LOL",tpl_lol);
	const zip= new_zip_model();
	let i=0;
	await yaml_dir_to_kv(PFX+'/pj', async (fname,p) => {
		if (true || p.id=="1716") { //XXX:DBG
			let s= tpl_expand(tpl_lol.all[2],{pj: p});
			let r= await zip.addFile(new File([s],p.id+''+'.html'));
			if (i++ % 100==0) console.log(i);
			return r;
		}
	});
	blob_download(await zip.getBlob(),'xhtml_proj.zip');
};

//YAML }

//XXX:MOVER_A_LIB {
import { parseJinjaLike } from 'src/svc/tplJinjaLike';

import { get_p } from 'src/rte/lib/util.js';
const tpl_expand1= (tpl, kv) => {
	return tpl.replace(/\{\{\s*(.+?)\s*\}\}/gs, (_,ks) => {
		let ksl= ks.trim().trim().split(/\s+or\s+/);
		let r;
		ksl.every( kOrConst => {
			r= kOrConst.startsWith('"') ? kOrConst : get_p(kv,'.'+kOrConst,false,/(\.)/);
			return r==null;
		});
		return (r || ('XXX_MISSING_'+JSON.stringify(ksl)));
	});
}

const tpl_expand= (tpl, kv) => {
	const DBG=1;
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
//XXX:MOVER_A_LIB {

export function Generator() {
	const [path, setPathImpl]= useState('');
	const [files, setFiles]= useState({});
	const toast = useRef(null);


	return (<div>
		<ul>
			<li><Button icon="pi pi-file-export" onClick={zip_expand} />Zip expand xz.zip</li>
			<li><Button icon="pi pi-arrow-down" onClick={get_tsv} />Download Google TSV</li>
			<li><Button icon="pi pi-arrow-left" onClick={on_generate_html} />Generate HTML</li>
			<li><Button icon="pi pi-arrow-left" onClick={on_generate_tsv} />Generate TSV</li>
		</ul>
	</div>)
}
