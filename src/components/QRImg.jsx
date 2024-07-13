//INFO: generate and display a qr code

import React, { useState, useCallback } from 'react'; 

import {QRGenerateData} from 'src/svc/qr'; 

export function QRImg({txt, sz}) {
	let qrdata; try {qrdata= QRGenerateData(txt);} catch(ex) { console.log("QR",txt, txt && txt.length, ex) }
	return (
		<div>
			<p>QR TODO</p>
			<p><img src={qrdata} height={sz||300} width={sz||300}/></p>	
			<p style={{maxWidth: '90vw', overflowWrap: 'anywhere'}}>{txt}</p>
		</div>
	)
}

