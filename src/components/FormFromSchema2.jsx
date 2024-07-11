import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const xdata= {
	v_highlighted: true,
	v_price: 59,
	v_currency: 'ARS',
	v_unit: 'mes',
	v_features: ['la que va','mejor'],
	v_action_link: 'o.v_action_link',
}

function Input({value,setValue,label,id}) {
	const inputRef= useRef(null)

	return (
		<div className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
			<FloatLabel>
				<InputText ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.target.value)} />
				<label htmlFor={id || label}>{label}</label>
			</FloatLabel>
			<Button icon="pi pi-times" severity="danger" onClick={ () => { setValue(''); inputRef.current?.focus() }} />
		</div>
	)
}

export function FormFromSchema() {
	const [data,setData]= useState({...xdata})

	return (<div>
		{ Object.entries(data).map( ([k,v]) => (
			<Input label={k} value={v} setValue={ v => setData({...data,[k]:v}) } />
		))}
	</div>)
}
