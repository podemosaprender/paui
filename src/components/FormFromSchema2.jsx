import React, { useState, useRef } from "react";

import { InputText } from './controls/InputText';

const xdata= {
	v_highlighted: true,
	v_price: 59,
	v_currency: 'ARS',
	v_unit: 'mes',
	v_features: ['la que va','mejor'],
	v_action_link: 'o.v_action_link',
}

export function FormFromSchema() {
	const [data,setData]= useState({...xdata})

	return (<div>
		{ Object.entries(data).map( ([k,v]) => (
			<InputText label={k} value={v} setValue={ v => setData({...data,[k]:v}) } />
		))}
	</div>)
}
