//INFO: generate and display a qr code

import React, { useState, useCallback } from 'react'; 

import { Image } from 'primereact/image';
import { TxtToClipboard } from './TxtToClipboard'
import {QRGenerateData} from 'src/svc/qr'; 

export function QRImg({txt, sz}) {
	const [msg,setMsg]= useState('');
	let qrdata; try {qrdata= QRGenerateData(txt);} catch(ex) { console.log("QR",txt, txt && txt.length, ex) }
	return (
		<div className="w-full">
			<Image className="block m-auto w-full sm:max-w-30rem" width="100%" src={qrdata}/>	
			<p className="text-wrap w-full md:w-6"> <TxtToClipboard txt={txt} /> </p>
		</div>
	)
}

