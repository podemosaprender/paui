const DBG=0;

import React, { useState, useEffect, useRef } from "react";

import { InputText } from './controls/InputText';
import { Button } from 'primereact/button';

import { apic_get_file } from 'src/svc/api';

//XXX:LIB {
import yaml from 'js-yaml';
const get_form_data= async (fp,defp) => {
	const pfx= '/aa/xyaml';
	let def= yaml.load( await apic_get_file(defp) );
	Object.keys(def).forEach(k => (def[k]=(k.match(/(director)|(integrante)|(autor)/) ? "persona" : "")));

	let xdata= yaml.load( await apic_get_file(fp) );
	Object.keys(def).forEach(k => (xdata[k]||='',xdata[k]=typeof(xdata[k])=='object' ? JSON.stringify(xdata[k]) : xdata[k]));
	Object.keys(xdata).forEach(k => ((xdata[k]||=''),xdata[k]=typeof(xdata[k])=='object' ? JSON.stringify(xdata[k]) : xdata[k]));

	let opts= {};
	opts.persona= await apic_get_file(pfx+'/data'+'/personas.tsv')
			.then(r => (
				r.split(/[\r\n]+/)
				.map(l => {let x= l.split(/\t/); return x[2]+', '+x[1]})
			));

	for (let k in def) {
		let col= def[k] || k.replace(/(_\w)?_id$/,'');
		def[k]= col;
		if (col!=k && !opts[col]) {
			let src= await apic_get_file(pfx+'/data/'+col+'.tsv');
			opts[col]= src.split(/[\r\n]+/);
		}
	}

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
		});
	},[]);

	return (<div>
		<div>
		{ data 
			? (Object.entries(data).map( ([k,v]) => (
			<InputText 
				key={k} label={k} value={v} setValue={ v => setData({...data,[k]:v}) } 
				autocompleteOpts={meta?.def[k] ? meta.opts[ meta.def[k] ]: null}
			/>)))
			: 'Loading...'
		}
		</div>
		<div>
			<Button label="Close" onClick={onClose} />
		</div>
	</div>)
}
