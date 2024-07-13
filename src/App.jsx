import { useState, useEffect, useCallback } from 'react'

import PWABadge from './PWABadge'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Editor } from 'src/components/Editor'
import { QRImg } from 'src/components/QRImg';
import { QRScan } from 'src/components/QRScan';
import { Upload } from 'src/components/Upload';
import { FormFromSchema } from 'src/components/FormFromSchema2';
import { EditorPalette } from 'src/components/EditorPalette';

import { ensure_kv } from 'src/svc/util';

//import { fsp } from './svc/git'
import { speech_from_text_p } from 'src/svc/speech-from-text'
//import * as crypto from 'src/svc/crypto';
// window.mycrypto= crypto;


async function handleFiles(files) {
	for (const file of files) {
		const blob = await file.getFile();
		//blob.handle = file;
		//const text = await blob.text();
		console.log(`${file.name} handled`);
	}
}
if ('launchQueue' in window) { console.log('File Handling API is supported!');
	launchQueue.setConsumer(launchParams => {
		handleFiles(launchParams.files);
	});
} else { console.error('File Handling API is not supported!'); }

const ch= new BroadcastChannel('messages')
ch.onmessage= (...a) => console.log("ch onmsg", a)
window.ch= ch;

navigator.serviceWorker.onmessage= (m) => console.log("MM",m)

function Files() {
	const [files, setFiles]= useState([]);

	const files_refresh= async () => {try{
		let l= await fetch('./up').then( res => res.text() )
		console.log("files_refresh",l)
		setFiles(l.split('\n'));
	}catch(ex){alert(ex)}}

	useEffect(() => {
		files_refresh();
	}, [])

	return (<>
		<h3>Files</h3>
		<Button label="Refresh" onClick={files_refresh} />
		<Upload />
		<ul>
			{ files.map((name,idx) => <li key={idx}><a href={'./up/'+name} target='_blank'>{name}</a></li>) }
		</ul>
	</>
	)
}

export default function Menu({options, value, setValue}) {
	const options_kv= ensure_kv(options);
	return (
		<div className="card" style={{ position: "fixed", bottom: 0, width: '100vw', height: '42px', overflowX: 'scroll' }}>
			<div style={{width: "max-content"}}>
		 { Object.entries(options_kv).map(([v,lbl]) => (
			 <Button label={lbl || v} key={v} onClick={ () => setValue(v) } rounded className="mx-1" />
			)) }
			</div>
		</div>
	)
}


export function App() {
	const [view,setView]= useState('');
	const [txt,setTxt]= useState('')

	useEffect(() => {
		//fsp.readFile('/xwip.txt','utf8').then( setTxt ).catch( x => console.log("read xwip",x) );
	}, [])

	const onChange= async (a_txt) => {
		//await fsp.writeFile('/xwip.txt',a_txt);	
	}

	return (
		<div>
			<div style={{ height: '90vh', overflowY: 'scroll'}}>
			{ 
				view=='qrimg' ?  <QRImg txt="https://podemosaprender.org" /> :
					view=='qrscan' ? <QRScan /> :
					view=='editor' ? <Editor value={txt} onChange={onChange}/> :
					view=='files' ? <Files /> :
					view=='form' ? <FormFromSchema /> :
					<div> <h1>Hola</h1> <EditorPalette /> </div>
			}
			</div>
			<Menu options={['qrimg','qrscan','editor','files','form','palette']} setValue={setView} value={view} />
			<PWABadge/>
		</div>
	)
}

