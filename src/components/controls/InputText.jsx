import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText as PrimeInputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";

//SEE: https://primereact.org/autocomplete/#dropdown
export function InputText({value,setValue,label,id,autocompleteOpts,autocompleteFn}) {
	const inputRef= useRef(null)
	const [items, setItems]= useState([]);

	const hasAutocomplete= autocompleteOpts || autocompleteFn;
	const search = (event) => {
		let q= event.query?.toLowerCase() || '';
		if (hasAutocomplete && q.length>0) {
			let _items= (autocompleteFn 
				? autocompleteFn(q, autocompleteOpts) 
				: autocompleteOpts.filter(s => (s && (s+'').toLowerCase().indexOf(q)>-1)))
			setItems(_items);
		}
	}
	
	return (
		<div key={id} className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
			<FloatLabel>
        { hasAutocomplete
				  ? <AutoComplete   ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.value)} suggestions={items} completeMethod={search} dropdown />
			    : <PrimeInputText ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.target.value)} />	
				}
			<label htmlFor={id || label}>{label}</label>
			</FloatLabel>
			<Button icon="pi pi-times" severity="danger" onClick={ () => { setValue(''); inputRef.current?.focus() }} />
		</div>
	)
}


