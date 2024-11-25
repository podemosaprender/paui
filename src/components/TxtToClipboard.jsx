//INFO: a span that can be copied to clipboard
import React, { useState } from 'react'; 

import {toClipboard} from '../svc/clipboard.js';

import { Button } from 'primereact/button';

export function TxtToClipboard({txt}) {
	const [msg,setMsg]= useState('');
	return (
		<span onClick={(e) => {toClipboard(txt); setMsg('Copied!');}}>
			<span >{txt}</span>
			<Button icon="pi pi-copy" rounded text aria-label="copy" />
			<br/>{msg}
		</span>
	)
}

