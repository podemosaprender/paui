import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

import { InputText } from './controls/InputText';

import { apic_get_file, apic_upload, apic_get_file_blob } from 'src/svc/api';

//XXX:MOVER_A_APP {
import { open, send } from 'src/svc/net_peerjs';
window.peeropen= open;
window.peersend= send;
//XXX:MOVER_A_APP }

//XXX:MOVER_A_LIB {
//SEE: https://gildas-lormeau.github.io/zip.js/
import * as zip from '@zip.js/zip.js';
const new_zip_model = (() => {
	let zipWriter;
	return {
		addFile(file, options) {
			if (!zipWriter) {
				zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), { bufferedWrite: true });
			}
			return zipWriter.add(file.name, new zip.BlobReader(file), options);
		},
		async getBlobURL() {
			if (zipWriter) {
				const blobURL = URL.createObjectURL(await zipWriter.close());
				zipWriter = null;
				return blobURL;
			} else { throw new Error("Zip file closed"); }
		}
	};
})
window.apic_get_file_blob= apic_get_file_blob;
window.new_zip_model= new_zip_model;
async function xgz(fcnt,ecnt) { xz= new_zip_model(); for (i=0;i<fcnt;i++) { if (i%1000==0) { console.log(i); } let a= []; for (j=0;j<ecnt;j++) {a.push("F"+i+":"+Math.random())}; await xz.addFile(new File([JSON.stringify(a)],"file"+i)) } }
async function xgzt ()  { await xgz(1000,3000); window.open(await xz.getBlobURL()) }
//XXX:MOVER_A_LIB }

//SEE: https://primereact.org/fileupload/#advanced
export function Files({onFileEdit}) {
	const [path, setPathImpl]= useState('');
	const [files, setFiles]= useState({});
	const toast = useRef(null);

	const setPath= (p) => { setPathImpl(p.replace(/\/+/g,'/')); }

	const files_refresh= async () => {try{
		let l= await apic_get_file('./up/'+path);
		console.log("files_refresh",l)
		setFiles(JSON.parse(l));
	}catch(ex){console.log("files_refresh",ex)}}

	useEffect(() => { files_refresh(); }, [path])

	const onUpload = () => {
		toast.current.show({ severity: 'info', summary: 'Success', detail: 'Files Uploaded' });
		files_refresh();
	};

	const onBeforeUpload = (e) => { 
		e.formData.set('path',path); 
		console.log("onBeforeUpload",e)
	};

	const uploadHandler = async (e) => {
		let name2file= {};
		e.files.forEach( f => (name2file[f.name]=f) )
		await apic_upload(name2file,'');
	};

	const file_new = (e) => { onFileEdit(path);	}

	const zip_new = async (e) => { //XXX:elegir archivos
		const zip= new_zip_model();
		await Promise.all( Object.entries( files ).map( async ([fn,fd]) => {
			if (fd.type!='dir') {
				let bytes= await apic_get_file_blob(path+'/'+fn);
				await zip.addFile(new File([bytes],fn))
			}
		}) );
		let url= await zip.getBlobURL();
		window.open(url);
	}

	return (<div>
		<div className="card flex" style={{ alignItems: "end"}}>
			<Toast ref={toast}></Toast>
			<InputText value={path} setValue={setPath} label="path" />
			<Button icon="pi pi-arrow-left" aria-label="on folder up" onClick={() => setPath(path.replace(/[^\/]+\/?$/,''))} />
			<Button icon="pi pi-refresh" aria-label="refresh file list" onClick={files_refresh} />
			<Button icon="pi pi-plus" aria-label="new file" onClick={file_new} />
			<Button icon="pi pi-window-minimize" aria-label="zip" onClick={zip_new} />
			<FileUpload 
				customUpload={true}
				uploadHandler={uploadHandler}
				onBeforeUpload={onBeforeUpload}
				onUpload={onUpload} 
				url="./_share-target" 
				maxFileSize={10000000} 
				accept="*|*/*" 
			  multiple  auto
				mode="basic" 
				name="media" 
				chooseOptions={{ icon: 'pi pi-upload', iconOnly: true, label: 'upload' }}
			/>
		</div>  
		<div className="card flex">
		<ul>
			{ Object.keys(files).sort().map( (name,idx) => {
				let d= files[name];
				let dsc= `${name || '.'} ${new Date(d.mtimeMs || d.ctimeMs).toLocaleString()} ` + (d.type!='dir' ? `${d.size ? d.size/1000 : '?'}kb` : '(dir)');
				return (
					<li key={idx}>{
						d.type!='dir' ? (
							name.match(/\.((txt)|(md)|(js)|(json)|(html)|(css))$/) 
								? <a onClick={() => onFileEdit(path,name)}>{dsc}</a>
								: <a href={'./up/'+path+'/'+name} target='_blank'>{dsc}</a>
						)
						: <a onClick={() => setPath(path+'/'+name)}>{dsc}</a>
					}</li>)
			}) }
		</ul>
		</div>
	</div>)
}
