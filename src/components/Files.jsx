import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

import { InputText } from './controls/InputText';

import { apic_get_file, apic_upload, apic_get_file_blob } from 'src/svc/api';
import { new_zip_model } from 'src/svc/zip';

//XXX:MOVER_A_APP {
import { open, send } from 'src/svc/net_peerjs';
window.peeropen= open;
window.peersend= send;
//XXX:MOVER_A_APP }

//
//XXX:MOVER_A_LIB {
//SEE: https://writingjavascript.com/how-to-extract-pdf-data-with-pdfjs
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs' //XXX:symlink en public de node_modules
async function pdf(path,name) {try{
	let blob= await apic_get_file_blob(path+'/'+name);
	const buffer= await new Response(blob).arrayBuffer();
	const pdf= await getDocument({data: buffer}).promise;
	window.pdf= pdf;
	console.log("pdf",pdf);
	let p_cnt= pdf.numPages;
	console.log("pdf numPages",p_cnt);
	let s='';
	for (let i=1;i < p_cnt; i++) {
		let p= await pdf.getPage(i);
		let el= await p.getTextContent();
		console.log("page items", i, el.items);
		s += el.items.map(it => (it.str || '')).join('\n');
	}
	console.log(s);
}catch(ex){console.log("pdf",ex)}}
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

	const zip_new = async (e) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
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

	const onPDF= pdf;
	

	const onFileView= async (path,name) => {
		let blob= await apic_get_file_blob(path+'/'+name)
		let u= URL.createObjectURL(blob);
		window.open(u,path+name);
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
							name.match(/\.((txt)|(md)|(js)|(json)|(yaml)|(html)|(css))$/) 
								? <a onClick={() => onFileEdit(path,name)}>{dsc}</a>
								: name.match(/\.pdf$/) 
								? <a onClick={() => onPDF(path,name)}>(PDF) {dsc}</a>
								: <a onClick={() => onFileView(path,name)}>{dsc}</a>
						)
						: <a onClick={() => setPath(path+'/'+name)}>{dsc}</a>
					}</li>)
			}) }
		</ul>
		</div>
	</div>)
}
