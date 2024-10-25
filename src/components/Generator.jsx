import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { apic_get_file, apic_set_file, apic_upload, apic_get_file_blob } from 'src/svc/api';
import { new_zip_model } from 'src/svc/zip';

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
window.xnorm= async () => {
	let ff= JSON.parse(await apic_get_file(''))
	let r= {};
	await Promise.all(
		Object.keys(ff)
			.filter(fname => fname.endsWith('.yaml'))
			.map(async (fname) => (r[fname]= yaml.load(await apic_get_file(fname))))
	);
	return r;
}

import { ser_p_kv } from 'src/rte/lib/util';
window.ser_p_kv= ser_p_kv;
//YAML }


//XXX:MOVER_A_LIB {
import { get_p } from 'src/rte/lib/util.js';
const tpl_expand= (tpl, kv) => {
	return tpl.replace(/\{\{\s*pj(\.[^}\s]+)\s*\}\}/gs, (_,ks) => get_p(kv,ks,false,/(\.)/));
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

	const on_generate= async (e) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
		const tpl= await apic_get_file('xt.html');
		const json_src= await apic_get_file('xf.json')
		console.log('on_generate src',json_src.slice(0,200));
		const data= JSON.parse(json_src);

		const zip= new_zip_model();
		let i=0;
		await Promise.all(Object.values( data.proyectos ).map( async (p) => {
			let s= tpl_expand(tpl,p);
			let r= await zip.addFile(new File([s],p.id+''+'.html'));
			if (i++ % 100==0) console.log(i);
			return r;
		}));
		let url= await zip.getBlobURL();
		window.open(url);
	};

	return (<div>
		<div className="card flex" style={{ alignItems: "end"}}>
			<Button icon="pi pi-arrow-left" aria-label="generate" onClick={on_generate} />
			<Button icon="pi pi-arrow-down" aria-label="generate" onClick={get_tsv} />
			<Button icon="pi pi-file-export" aria-label="generate" onClick={zip_expand} />
		</div>  
	</div>)
}
