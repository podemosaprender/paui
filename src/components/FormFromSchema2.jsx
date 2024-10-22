import React, { useState, useRef } from "react";
import { apic_set_file, apic_get_file } from 'src/svc/api'

import { InputText } from './controls/InputText';
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText as PrimeInputText } from "primereact/inputtext";
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';

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

	const toast = useRef(null);

	const handleParseJSON = () => {
		const newData = jsonInputRef.current.value;
		let json;
		try {
			json = JSON.parse(newData);
			setData(json);
			toast.current.show({ severity: 'success', summary: 'Success', detail: 'JSON parsed successfully' });
		}
		catch (e) {
			toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed to parse: ${e}` });
		}
	}

	// TODO: Sacar alerts, poner toasts?
	const handleSaveToJSON = async () => {
		const filename = jsonSaveRef.current.value;
			await apic_set_file(`${filename}.txt`,  JSON.stringify(data));
			toast.current.show({ severity: 'success', summary: 'Success', detail: `Saved to file ${filename}.txt` });
	}

	return (<div style={{padding: "1rem"}}>
		{/* TODO: Usar PrimeReact */}
		<Toast ref={toast}></Toast>
		<Accordion activeIndex={1}>
			<AccordionTab header="Import/Export">
			<div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
				<div className="p-inputgroup flex-1">
					<InputTextarea ref={jsonInputRef}></InputTextarea>
					<Button onClick={handleParseJSON} label="Parse JSON"/>
				</div>
				<div className="p-inputgroup flex-1"> 
					<PrimeInputText ref={jsonSaveRef} defaultValue="[File path]" />
					<Button onClick={handleSaveToJSON} label="Save to JSON file"/>
				</div>
			</div>
			</AccordionTab>
			<AccordionTab header="Form fields">
			{ Object.entries(data).map( ([k,v], idx) => (
				<InputText key={idx} label={k} value={v} setValue={ v => setData({...data,[k]:v}) } />
			))}
			</AccordionTab>
		</Accordion>

	</div>)
}
