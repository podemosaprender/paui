const DBG=0;

import React, { useState, useEffect, useRef } from "react";

import { InputText } from './controls/InputText';
import { apic_get_file } from 'src/svc/api';

//XXX:LIB {
import yaml from 'js-yaml';
const get_form_data= async () => {
	const pfx= '/aa/xyaml';
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

	let def= yaml.load( await apic_get_file(pfx+'/def/def_proyecto.yaml') );
	Object.keys(def).forEach(k => (def[k]=(k.match(/(director)|(integrante)/) ? "persona" : "")));
	Object.keys(def).forEach(k => (xdata[k]=""));

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
