const DBG=0;

import React, { useState, useEffect, useRef } from "react";

import { InputText } from './controls/InputText';
import { SelectButton } from 'primereact/selectbutton';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';

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
	Object.keys(xdata).forEach(k => ((xdata[k]||=''),xdata[k]=typeof(xdata[k])=='object' ? JSON.stringify(xdata[k]) : xdata[k])); //A: todo v es string

	Object.keys(def).forEach(k => {xdata[k]= (def[k].endsWith('*') && !Array.isArray(xdata[k])) ? [xdata[k]] : xdata[k]})

	return {xdata, def, opts}
}
DBG>0 && (window.get_form_data= get_form_data);
//XXX:LIB }

export function FormFromSchema({fp,defp, onClose}) {
	const [data,setData]= useState(null)
	const [meta,setMeta]= useState(null)
	useEffect(() => {
		get_form_data(fp,defp).then( dataAndMeta => {
			setMeta( dataAndMeta );
			setData( dataAndMeta.xdata );
			console.log("FormFromSchema meta",dataAndMeta.def );
		});
	},[defp]);

	return (<div>
		<div>
		{ data 
			? (Object.keys({...meta.def, ...data}).map( (k) => { let v= data[k];
				if (meta?.def[k]=='si_no') {
					return (<div key={k} className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
     					<label htmlFor={k}>{k}</label>
							<SelectButton id={k} value={v} onChange={(e) => setData({...data,[k]:e.value})} options={['Si','No']} />
					</div>)
				} else if (meta?.def[k]?.startsWith('|')) {
					return (<div key={k} className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
     					<label htmlFor={k}>{k}</label>
							<SelectButton id={k} value={v} onChange={(e) => setData({...data,[k]:e.value})} options={meta.def[k].split('|').slice(1)} />
					</div>)
				} else {
					return <InputText 
						key={k} label={k} 
						value={v}
						setValue={ v => setData({...data,[k]:v}) } 
						autocompleteOpts={meta?.def[k] ? meta.opts[ meta.def[k].replace('*','') ]: null}
						multiple={meta?.def[k]?.endsWith('*')}
					/>
				}
			}))
			: 'Loading...'
		}
		</div>
		<div>
			<Button label="Close" onClick={onClose} />
		</div>
	</div>)
}
