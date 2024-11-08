const DBG=0;

import React, { useState, useEffect, useRef } from "react";

import { InputText } from './controls/InputText';
import { SelectButton } from 'primereact/selectbutton';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import { apic_get_file } from 'src/svc/api';

//XXX:LIB {
import yaml from 'js-yaml';
const get_form_data= async (fp,defp) => {
	const pfx= '/aa/xyaml';

	let def= yaml.load( await apic_get_file(defp) );
	let xdata= yaml.load( await apic_get_file(fp) );

	let opts= {};
	opts.persona= await apic_get_file(pfx+'/data'+'/personas.tsv')
			.then(r => (
				r.split(/[\r\n]+/)
				.map(l => {let x= l.split(/\t/); return x[2]+', '+x[1]+' '+x[3]})
			));

	for (let k in def) {
		if (def[k]=='si_no' || def[k].startsWith('|')) {
		} else {
			let col= (def[k] || k.replace(/(_\w)?_id$/,'')).replace(/\*/g,'');
			def[k] ||= col;
			if (col!=k && !opts[col]) {
				let src= await apic_get_file(pfx+'/data/'+col+'.tsv');
				opts[col]= src.split(/[\r\n]+/);
			}
		}
	}

	Object.keys(def).forEach(k => (xdata[k]||='')); //A: xdata para toda k en def
	Object.keys(xdata).forEach(k => {
		xdata[k]||=null;
		if (xdata[k] && def[k]=='persona*') {
			xdata[k]= Object.values(xdata[k]).map(v => v.apellido+', '+v.nombre+' '+v.email)
		} else if (xdata[k] && def[k]=='persona*') {
			let v= xdata[k];
			xdata[k]= v.apellido+', '+v.nombre+' '+v.email;
		} 
		else if (xdata[k] && typeof(xdata[k])=='object') {
			xdata[k]= JSON.stringify(xdata[k])
		}
	}); //A: todo v es string

	Object.keys(def).forEach(k => {xdata[k]= (def[k].endsWith('*') && !Array.isArray(xdata[k])) ? [xdata[k]] : xdata[k]})

	return {xdata, def, opts}
}
DBG>0 && (window.get_form_data= get_form_data);
//XXX:LIB }

export function FormFromSchema({fp,defp, onClose}) {
	const [data,setData]= useState(null)
	const [meta,setMeta]= useState(null)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		get_form_data(fp,defp).then( dataAndMeta => {
			setMeta( dataAndMeta );
			setData( dataAndMeta.xdata );
			console.log("FormFromSchema meta",dataAndMeta.def );
		});
	},[defp]);

	return (<div>
		<div className="controles flex gap-2">
			<Button label="Close" onClick={onClose} />
			<div>
				<Sidebar visible={visible} onHide={() => setVisible(false)}>
					<h2>Editar en formato...</h2>
					<Button className="text-left w-full">YAML (abre editor de texto)</Button>
					<h2>Descargar archivos</h2>
					<div className="flex flex-column gap-2">
						<Button className="text-left w-full">Generar TSV descargable</Button>
						<Button className="text-left w-full">Generar HTML descargable</Button>
					</div>
				</Sidebar>
				<Button icon="pi pi-arrow-right" className="flex gap-2" onClick={() => setVisible(true)}>Generar/convertir...</Button>
			</div>
		</div>
		<div>
		{ data 
			? (Object.keys({...meta.def, ...data}).map( (k) => { let v= data[k];
					return (		
						<div key={k} className="field grid" style={{marginTop: "2rem"}}>
						<label htmlFor={k} className="col-12 mb-2 md:col-2 md:mb-0">{k.replace(/_+/g,' ')}</label>
						<div className="col-12 md:col-10">{
							(meta?.def[k]=='si_no') ?  
								<SelectButton id={k} 
									value={v} onChange={(e) => setData({...data,[k]:e.value})} 
									options={['Si','No']} 
								/> :
							(meta?.def[k]?.startsWith('|')) ?
								<SelectButton id={k} value={v} onChange={(e) => setData({...data,[k]:e.value})} options={meta.def[k].split('|').slice(1)} /> :
							<InputText 
								key={k} label={k} 
								value={v} setValue={ v => setData({...data,[k]:v}) } 
								autocompleteOpts={ meta?.def[k] ? meta.opts[ meta.def[k].replace('*','') ]: null }
								multiple={ meta?.def[k]?.endsWith('*') }
								rows={'resumen titulo'.split(' ').indexOf(k)>-1 ? 1 : null}
							/>
						}</div>
					</div>)
			}))
			: 'Loading...'
		}
		</div>

	</div>)
}
