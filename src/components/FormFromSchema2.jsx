import React, { useState, useRef } from "react";
import { apic_set_file, apic_get_file } from 'src/svc/api'

import { InputText } from './controls/InputText';

const xdata= {
	v_highlighted: true,
	v_price: 591,
	v_currency: 'ARS',
	v_unit: 'mes',
	v_features: ['la que va','mejor'],
	v_action_link: 'o.v_action_link',
}


export function FormFromSchema() {
	const [data,setData]= useState({...xdata})

	const jsonInputRef = useRef(null);
	const jsonSaveRef = useRef(null);

	const handleParseJSON = () => {
		const newData = jsonInputRef.current.value;
		let json;
		try {
			json = JSON.parse(newData);
			setData(json);
		}
		catch (e) {
			alert(`Error parsing JSON: ${e}`);
		}
	}

	// TODO: Sacar alerts, poner toasts?
	const handleSaveToJSON = async () => {
		const filename = jsonSaveRef.current.value;
			await apic_set_file(`${filename}.txt`,  JSON.stringify(data));
			alert(`saved: ${JSON.stringify(data)}`);
	}

	return (<div>
		{/* TODO: Usar PrimeReact */}
		<div>
			<textarea ref={jsonInputRef} name="" id=""></textarea>
			<button onClick={handleParseJSON}>Parse JSON</button>
		</div>
		<div>
			<input ref={jsonSaveRef} type="text" name="" id="" />
			<button onClick={handleSaveToJSON}>Save to JSON file</button>
		</div>
		{ Object.entries(data).map( ([k,v], idx) => (
			<InputText key={idx} label={k} value={v} setValue={ v => setData({...data,[k]:v}) } />
		))}
	</div>)
}
