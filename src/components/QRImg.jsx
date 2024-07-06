//INFO: generate and display a qr code

import React, { useState, useCallback } from 'react'; 

import {QRGenerateData} from 'src/svc/qr'; 

export function QRImg({txt, sz}) {
	const qrdata= QRGenerateData(txt);
	console.log({qrdata})
	return (
		<div>
			<p>QR TODO {txt}</p>
			<p><img src={qrdata} height={sz||300} width={sz||300}/></p>	
		</div>
	)
}

