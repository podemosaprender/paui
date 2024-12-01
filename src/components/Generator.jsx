import React, { useRef, useState, useEffect, useCallback } from 'react';

import { Button } from 'primereact/button';

import { generate_html, forEachProj_tsv } from 'src/svc/generate';
import { get_tsv } from 'src/svc/sync';
import { get_file_tsv } from 'src/svc/api-util'
import { apic_set_file } from 'src/svc/api';

//XXX:API {
const with_log_file= async (fname, onmsg, fn, o, ...args) => { 
	let log=[], logf=(...a) => {onmsg(...a); log.push(a)}, i= args.indexOf('ON_ERR');
	args[i<0 ? Math.max(args.length,1) : i]= logf;
	window.x= args
	try { await fn.apply(o,args); }
	catch (ex) { logf('EXCEPTION '+ex,ex); throw(ex); }
	finally { await apic_set_file(fname, JSON.stringify(log,0,2)); onmsg("LISTO, registro en "+fname) }
}

const CMD_FN= { 
	forEachProj_tsv: ((onmsg) => with_log_file('log/ries/check.txt', onmsg, forEachProj_tsv)),
	generate_html: ((onmsg) => with_log_file('log/ries/generate.txt', onmsg, generate_html, this, forEachProj_tsv)),
	get_tsv: ((onmsg,...a) => with_log_file('log/ries/sync.txt', onmsg, get_tsv, this, ...a)),
	sitio_base: (async (onmsg) => {
		let links= await get_file_tsv('ries/links.tsv');	
		let tpl= links.find(r => r[0]=='tpl_proj.html')
		let url0= tpl[1];
		let url0p= url0.split('/');
		let url= 'https://github.com/'+url0p[3]+'/'+url0p[4]+'/archive/refs/heads/main.zip';
		onmsg("URL "+url);
		window.open(url,'_blank');
	}),
}

function dispatch_cmd(onmsg,fn,args,data) {
	CMD_FN[fn](onmsg, ...args)
}
//XXX:API }

//XXX:CFG {
const CFG_CMD= {
	base_site: { fn: 'sitio_base', args: [], dsc: 'Descargar sitio base.', icon: 'pi-home' },
	sync: { fn: 'get_tsv', args: ['https://docs.google.com/spreadsheets/d/e/2PACX-1vSA4XW7aPv5E7QOpMYk1vYuk_DY3xtbG4TY-oWomKojuaeJh4apwF1PfTx6ElQe7AQIvD0egAH33lWs/pub?gid=1828880156&single=true&output=tsv','ries/'], dsc: 'Traer datos de la planilla Google.', icon: 'pi-table' },
	revisar: { fn: 'forEachProj_tsv', args: [], dsc: 'Revisar consistencia de datos.', icon: 'pi-check' },
	generar_html: { fn: 'generate_html', args: [], dsc: 'Generar HTML.', icon: 'pi-tags' },
}
//XXX:CFG }

export function Generator() {
	const [msg, setMsg]= useState('');
	const onMsg= useCallback( (t,d) => setMsg((new Date()).toLocaleTimeString()+': '+t) );

	return (<div>
		<ul>
			{ Object.entries(CFG_CMD).map( ([k,v]) => (
				<p key={k}><Button icon={"pi "+ (v.icon || "pi-arrow-down")} label={ v.dsc } onClick={() => { onMsg('Iniciando '+v.dsc); dispatch_cmd(onMsg, v.fn,v.args,v)}} text raised /></p>
			))}
		</ul>
		<div>{ msg }</div>
	</div>)
}
