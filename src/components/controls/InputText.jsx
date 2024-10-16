import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText as PrimeInputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";

function DropdownDemo() {
    return (
        <div className="card flex justify-content-center">
        </div>
    )
}

//SEE: https://primereact.org/autocomplete/#dropdown
export function InputText({value,setValue,label,id,autocompleteOpts,autocompleteFn}) {
	const inputRef= useRef(null)
	const [items, setItems]= useState([]);

	const search = (event) => {
		let _items = [...Array(10).keys()];
		setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
	}
	
	//XXX:<PrimeInputText ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.target.value)} />

	return (
		<div key={id} className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
			<FloatLabel>
        <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
				<label htmlFor={id || label}>{label}</label>
			</FloatLabel>
			<Button icon="pi pi-times" severity="danger" onClick={ () => { setValue(''); inputRef.current?.focus() }} />
		</div>
	)
}


