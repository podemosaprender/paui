import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';

import { generate_html, forEachProj_tsv } from 'src/svc/generate';
import { get_tsv } from 'src/svc/sync';
import { apic_set_file } from 'src/svc/api';

//XXX:API {
const with_log_file= async (fname, fn, o, ...args) => { 
	let log=[], logf=(...a) => log.push(a), i= args.indexOf('ON_ERR');
	args[i<0 ? Math.max(args.length,1) : i]= logf;
	try { await fn.apply(o,args); }
	catch (ex) { logf('EXCEPTION '+ex,ex); throw(ex); }
	finally { await apic_set_file(fname, JSON.stringify(log,0,2)) }
}

const CMD_FN= { 
	forEachProj_tsv: (() => with_log_file('ries_log_check.txt', forEachProj_tsv)),
	generate_html: (() => with_log_file('ries_log_generate.txt', generate_html, this, forEachProj_tsv)),
	get_tsv 
}

function dispatch_cmd(fn,args,data) {
	CMD_FN[fn].apply(args)
}
//XXX:API }

//XXX:CFG {
const CFG_CMD= {
	sync: { fn: 'get_tsv', args: [], dsc: 'Traer datos de la planilla Google.' },
	revisar: { fn: 'forEachProj_tsv', args: [], dsc: 'Revisar consistencia de datos.' },
	generar_html: { fn: 'generate_html', args: [], dsc: 'Generar HTML' },
}
//XXX:CFG }

export function Generator() {
	return (<div>
		<ul>
			{ Object.entries(CFG_CMD).map( ([k,v]) => (
				<li key={k}><Button icon={"pi "+ (v.icon || "pi-arrow-down")} onClick={() => dispatch_cmd(v.fn,v.args,v)} />{ v.dsc }</li>
			))}
		</ul>
	</div>)
}
