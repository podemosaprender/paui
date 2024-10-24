import React, { useState, useEffect, useRef } from "react";

import { InputText } from './controls/InputText';
import { apic_get_file } from 'src/svc/api';

//XXX:LIB {
import yaml from 'js-yaml';
const get_form_data= async () => {
	let xdata= {
		autor1: 'pepe',
		autor2: 'ana',
		v_highlighted: true,
		v_price: 59,
		v_currency: 'ARS',
		v_unit: 'mes',
		v_features: ['la que va','mejor'],
		v_action_link: 'o.v_action_link',
	}

	let def= yaml.load( await apic_get_file('def_proyecto.yaml') );
	Object.keys(def).forEach(k => (xdata[k]=""));

	let opts= {};
	opts.personas= await apic_get_file('personas.tsv')
			.then(r => (
				r.split(/[\r\n]+/)
				.map(l => {let x= l.split(/\t/); return x[2]+', '+x[1]})
			));

	for (let k in def) {
		let col= k.replace(/(_\w)?_id$/,'');
		def[k]= col;
		if (col!=k && !opts[col]) {
			let src= await apic_get_file(col+'.tsv');
			opts[col]= src.split(/[\r\n]+/);
		}
	}

	return {xdata, def, opts}
}
window.get_form_data= get_form_data;
//XXX:LIB }

export function FormFromSchema() {
	const [data,setData]= useState(null)
	const [meta,setMeta]= useState(null)
	useEffect(() => {
		get_form_data().then( dataAndMeta => {
			setMeta( dataAndMeta );
			setData( dataAndMeta.xdata );
		});
	},[]);

	return (<div>
		{ data 
			? (Object.entries(data).map( ([k,v]) => (
			<InputText 
				key={k} label={k} value={v} setValue={ v => setData({...data,[k]:v}) } 
				autocompleteOpts={meta?.def[k] ? meta.opts[ meta.def[k] ]: null}
			/>)))
			: 'Loading...'
		}
	</div>)
}
