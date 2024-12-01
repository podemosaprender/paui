const DBG=0;

import { useState, useEffect, useCallback } from 'react'

import PWABadge from './PWABadge'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Editor } from 'src/components/Editor'
import { Files } from 'src/components/Files';
import { FormFromSchema } from 'src/components/FormFromSchema2';
import { Generator } from 'src/components/Generator';
import { Home } from 'src/components/Home';

import { ensure_kv } from 'src/svc/util';
import { broadcastChannel, apic_set_file, apic_get_file, apic_call } from 'src/svc/api';

import { speech_from_text_p } from 'src/svc/speech-from-text'; //XXX:

broadcastChannel.onmessage= (...a) => console.log("ch onmsg", a) //XXX:

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
	const [menu,setMenu]= useState({});

	const [view,setView]= useState('generator');
	const [pk,setPk]= useState('')
	const [txt,setTxt]= useState('')

	useEffect(() => {
		if (view=='key' && !pk) { 
			apic_call('key_pub',['k']).then( (m) => {
				console.log("CMP key_pub", m); let pk= m; console.log({pk},pk.length); setPk(pk); 
			});
		}
	},[view]);

	const onMenuClose= async (menuKey) => {
		delete menu[menuKey];
		setMenu(menu);
		setView('home');
	}

	const onFileEdit= async (path,fname) => {
		let fp= path+'/'+(fname||'new.txt')
		let menuEntry;
		if (fp.match(/yaml/)) { 
			let defp='/aa/xyaml/def/def_'+(fp.includes('/pj/') ? 'proyecto' : 'publicacion')+'.yaml'; //XXX:filetypes
			menuEntry= {t: 'form',fp, defp, onClose: () => onMenuClose(fp) }
		} else {
			let s; try {s = await apic_get_file(fp)}catch(ex){}
			let w= async (txt) => (await apic_set_file(fp,txt));
			console.log("onFileEdit",typeof(s))
			window.xf= s;
			menuEntry= {t: 'editor',fp,txt: s||'', onChange: w, onClose: () => onMenuClose(fp) }
		}
		setMenu({...menu, [fp]: menuEntry })
		setView(fp);
	}

	let menuViewData= menu[view];
	return (
		<div>
			<div style={{ height: '90vh', overflowY: 'scroll'}}>
				{ 
					menuViewData ? (
						menuViewData.t=='editor' ?  <Editor fp={menuViewData.fp} value={''+menuViewData.txt} onChange={menuViewData.onChange} onClose={menuViewData.onClose} /> :
						menuViewData.t=='form' ?  <FormFromSchema fp={menuViewData.fp} defp={menuViewData.defp} onClose={menuViewData.onClose} /> :
						<h3>Todo { menuViewData.t }</h3>
					) :
					view=='home' ? <Generator /> :
					view=='editor' ? <Editor value={txt} /> :
					view=='form' ? <FormFromSchema /> :
					view=='files' ? <Files onFileEdit={onFileEdit} /> :
					view=='generator' ? <Generator /> :
					<h3>Unknown view {view}</h3>
				}
			</div>
			<Menu options={['generator','files', ...Object.keys(menu)]} setValue={setView} value={view} />
			<PWABadge/>
		</div>
	)
}

