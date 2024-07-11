import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";

export function InputSelectOneRadio({options,name,onChange,value}) {
	const optionskv= Array.isArray(options) ? Object.assign({},...options.map(o => ({[o]: o}))) : options;
	return (
		<div className="card flex justify-content-center">
			<div className="flex flex-wrap gap-3">
				{ Object.entries(optionskv).map( ([v,lbl]) => (
					<div key={v} className="flex align-items-center">
						<RadioButton inputId={v} name={name} value={v} onChange={onChange} checked={value === v} />
						<label htmlFor={v} className="ml-2">{lbl}</label>
					</div>
				))}
			</div>
		</div>
	);
}
