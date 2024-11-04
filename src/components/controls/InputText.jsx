import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText as PrimeInputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";

//SEE: https://primereact.org/autocomplete/#dropdown
//SEE: https://primereact.org/autocomplete/#multiple (agregar "query (+)" como opcion en opciones)
export function InputText({value,setValue,label,id,multiple,rows,autocompleteOpts,autocompleteFn}) {
	multiple && console.log("InputText multiple",label,value);
	const inputRef= useRef(null)
	const [items, setItems]= useState([]);

	const hasAutocomplete= autocompleteOpts || autocompleteFn;
	const search = (event) => {
		let q= event.query?.toLowerCase() || '';
		if (hasAutocomplete && q.length>0) {
			let _items= (autocompleteFn 
				? autocompleteFn(q, autocompleteOpts) 
				: autocompleteOpts.filter(s => (s && (s+'').toLowerCase().indexOf(q)>-1)))
			setItems([..._items, event.query+' (+) ']);
		} else if (autocompleteOpts && q=='') {
			setItems(autocompleteOpts);
		}
	}
	
	return (
		<div className="p-inputgroup flex-1">
        { hasAutocomplete
					? (multiple ? <AutoComplete ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.value)} suggestions={items} completeMethod={search} multiple />
						 : <AutoComplete ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.value)} suggestions={items} completeMethod={search} dropdown />
					)
			    : (
						rows>0 ?  <InputTextarea ref={inputRef} autoResize value={value||''} onChange={(e) => setValue(e.target.value)} rows={rows} />
						: <PrimeInputText ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.target.value)} />	
					)
				}
			<Button icon="pi pi-times" severity="danger" onClick={ () => { setValue(''); inputRef.current?.focus() }} />
		</div>
	)
}


