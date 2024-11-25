const DBG=0;

import React, { useState, useEffect, useRef } from "react";

import {toClipboard} from 'src/svc/clipboard';

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
		else if (xdata[k] && typeof(xdata[k])=='object' && def[k] && opts[def[k].replace('*','')]) {
			let c= opts[def[k].replace('*','')];
			xdata[k]= c.find(r => r.startsWith(xdata[k].id+'\t')) 
		}	
		else if (xdata[k] && typeof(xdata[k])=='object') {
			xdata[k]= JSON.stringify(xdata[k])
		}
	}); //A: todo v es string

	Object.keys(def).forEach(k => {xdata[k]= (def[k].endsWith('*') && !Array.isArray(xdata[k])) ? [xdata[k]].filter(v => v!=null && v!='') : xdata[k]})

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

	const setValue= (k,v) => { setData({...data, [k]:v}) }

	const optionsFew= (k) => {
		return (
			(meta?.def[k]=='si_no') ? ['Si','No'] :
			meta?.def[k]?.startsWith('|') ? meta.def[k].split('|').slice(1) :
			null
		)
	}

	const optionsMany= (k) => {
		return (meta?.def[k] ? meta.opts[ meta.def[k].replace('*','') ]: null)
	}

	const isMulti= (k) => {
		return meta?.def[k]?.endsWith('*') 
	}

	const rowCnt= (k) => {
		return 'resumen titulo'.split(' ').indexOf(k)>-1 ? 1 : null
	}

	return (<div>
		<div>
		{ data 
			? (Object.keys({...meta.def, ...data}).map( (k) => { let v= data[k]; let lbl= k.replace(/_+/g,' ');
					return (		
						<div key={k} className="field grid" style={{marginTop: "2rem"}}>
						<label htmlFor={k} className="col-12 mb-2 md:col-2 md:mb-0">{lbl}</label>
						<div className="col-12 md:col-10">{
							optionsFew(k) ?  <SelectButton id={k} 
								value={v} onChange={(e) => setValue(k,e.value)} 
								options={optionsFew(k)} 
							/> :
							<InputText key={k} label={k} 
								value={v} setValue={ v => setValue(k,v) } 
								autocompleteOpts={ optionsMany(k) }
								multiple={ isMulti(k) }
								rows={ rowCnt(k) }
							/>
						}</div>
					</div>)
			}))
			: 'Loading...'
		}
		</div>
		<div>
			<Button label="Close" onClick={onClose} />
			<Button label="YAML" onClick={() => {toClipboard(yaml.dump(data));alert('Copied')}} />
			<Button label="Save" onClick={() => console.log("XXX", JSON.stringify(data,0,2))} />
		</div>
	</div>)
}
