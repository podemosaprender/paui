//INFO: a span that can be copied to clipboard
import React, { useState } from 'react'; 

import { Button } from 'primereact/button'

export function TxtToClipboard({txt}) {
	const [msg,setMsg]= useState('');
	return (
		<span onClick={(e) => {navigator.clipboard.writeText(txt); setMsg('Copied!');}}>
			<span >{txt}</span>
			<Button icon="pi pi-copy" rounded text aria-label="copy" />
			<br/>{msg}
		</span>
	)
}

