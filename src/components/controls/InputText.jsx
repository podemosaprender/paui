import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { InputText as PrimeInputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

export function InputText({value,setValue,label,id}) {
	const inputRef= useRef(null)

	return (
		<div className="p-inputgroup flex-1" style={{marginTop: "2rem"}}>
			<FloatLabel>
				<PrimeInputText ref={inputRef} id={id || label} value={value} onChange={(e) => setValue(e.target.value)} />
				<label htmlFor={id || label}>{label}</label>
			</FloatLabel>
			<Button icon="pi pi-times" severity="danger" onClick={ () => { setValue(''); inputRef.current?.focus() }} />
		</div>
	)
}


