import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { apic_get_file, apic_upload, apic_get_file_blob } from 'src/svc/api';
import { new_zip_model } from 'src/svc/zip';

//XXX:MOVER_A_LIB {
import { get_p } from 'src/rte/lib/util.js';
const tpl_expand= (tpl, kv) => {
	return tpl.replace(/\{\{\s*pj(\.[^}\s]+)\s*\}\}/gs, (_,ks) => get_p(kv,ks,false,/(\.)/));
}

window.get_p= get_p;
window.tpl_expand= tpl_expand;
//XXX:MOVER_A_LIB }

//SEE: https://primereact.org/fileupload/#advanced
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
		</div>  
	</div>)
}
