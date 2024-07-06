import { useState, useEffect, useCallback } from 'react'

import PWABadge from './PWABadge'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Editor } from 'src/components/Editor'
import { QRImg } from 'src/components/QRImg';
import { QRScan } from 'src/components/QRScan';

import { fsp } from './svc/git'
import { speech_from_text_p } from 'src/svc/speech-from-text'
import * as crypto from 'src/svc/crypto';
window.mycrypto= crypto;

export function App() {
	const [view,setView]= useState('');
	const [txt,setTxt]= useState('')

	useEffect(() => {
		fsp.readFile('/xwip.txt','utf8').then( setTxt );
	}, [])

	const onChange= async (a_txt) => {
		await fsp.writeFile('/xwip.txt',a_txt);	
	}

  return (
    <div>
			{ 
				view=='qrimg' ?  <QRImg txt="https://podemosaprender.org" /> :
				view=='qrscan' ? <QRScan /> :
				view=='editor' ? <Editor value={txt} onChange={onChange}/> :
				<h1>Hola</h1>
			}
      <PWABadge />
    </div>
  )
}

