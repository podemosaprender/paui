//YAML {
import { ser_p_kv } from 'src/rte/lib/util';
window.ser_p_kv= ser_p_kv;
import { apic_set_file, apic_get_file } from 'src/svc/api'
import { get_file_tsv } from 'src/svc/api-util'
import { blob_download, lol_to_kvokv } from 'src/rte/lib/util';
import yaml from 'js-yaml';
window.yaml= yaml;
window.apic_get_file= apic_get_file;
import { parseJinjaLike, tpl_expand } from 'src/svc/tplJinjaLike'

const DBG=0;

async function yaml_dir_to_kv(path='', onFile) {
	let ff= JSON.parse(await apic_get_file(path))
	await Promise.all(
		Object.keys(ff)
			.filter(fname => fname.endsWith('.yaml'))
			.map(async (fname) => await onFile( fname, yaml.load(await apic_get_file(path+'/'+fname))) )
	);
}

async function on_generate_tsv() {
	let s='';
	let hdr= null;
	await yaml_dir_to_kv(PFX+'/pj', async (fname, kv) => {
		const flat= ser_p_kv(kv,'');
		if(!hdr) { hdr= Object.keys(flat); s+='fname\t'+hdr.join('\t')+'\n'; }
		s+= fname+'\t'+ hdr.map(k => ((flat[k]||'')+'').replace(/\r?\n/g,'\\n')).join('\t')+'\n';
	});
	//DBG: console.log("SEE xout"); window.xout= s;
	blob_download(s,'xpj1.tsv');
}

import { new_zip_model } from 'src/svc/zip';
export const generate_html= async (forEachProj, on_err) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
	const tpl_src= await apic_get_file('tpl_proj.html'); //XXX:CFG
	const tpl_lol= parseJinjaLike(tpl_src)
	console.log("TPL_LOL",tpl_lol);
	const zip= new_zip_model();
	let i=0;
	await forEachProj( async (p) => {
		if (true || p.id=="1716") { //XXX:DBG
			let s= tpl_expand(tpl_lol.all[2],{pj: p});
			let r= await zip.addFile(new File([s],p.id+''+'.html'));
			if (i++ % 100==0) console.log(i);
			return r;
		}
	}, on_err);
	blob_download(await zip.getBlob(),'xhtml_proj.zip');
};

export const forEachProj_tsv= async (cb, on_err) => { //XXX:elegir archivos //XXX:LIB alcanza pasar files
	on_err ||= console.log;

	let rels= { //XXX:CFG
		'proy': {pfx:'ries_'},
		'pub': {pfx:'ries_'},
		'personas':{pfx:'ries_'},
		'clasificaciones':{pfx:'ries_',idCol:'id'},
		'financiamientos':{},
		'instituciones':{},
		'regiones_educativas':{},
		'tipos_de_productos':{},
		'cpres':{},
		'gestion':{},
	}


	let D= {};
	await Promise.all(Object.entries(rels).map( async ([k,def]) => {
		let on_errDetails= (t,d) => on_err(t, {...d, col: k, def}); 
		D[k]= lol_to_kvokv( await get_file_tsv((def.pfx || 'aa/xyaml/data/')+k+'.tsv'), on_errDetails,(def.idCol || ['slug','sigla','id']) );
		DBG && (window[k]= D[k]);
	}))

	const expand_rel= (p,k,col,t) => {
		let vs= p[k] && p[k].split(/\s*;\s*/).map(s=>s.trim()).filter(x=>x);
		if (vs && vs.length) {
			let find_one= (vk) => { 
				let v2= D[col][vk]; 
				if (v2==null) { on_err('data/rel/FALTA',{vk,col,k,id: p.id,rowidx: p.rowidx}) } 
				return v2;
			};
			p[k+'_ori']=p[k];
		p[k]= t=='*' ? vs.reduce( (acc, vk) => {acc[vk]= find_one(vk); return acc}, {})
								 : find_one(vs[0])
		}
	}

	Object.values(D.clasificaciones).forEach(c => { c.lvl= (c.id.length>1) ? 'sub_' : '' });

	Object.values(D.proy).forEach(p => {
		expand_rel(p,'director','personas','1');	
		expand_rel(p,'instituciones','instituciones','1');	
		expand_rel(p,'regiones_educativas','regiones_educativas','1');	
		expand_rel(p,'cpres','cpres','1');	
		expand_rel(p,'gestion','gestion','1');	
		expand_rel(p,'integrantes','personas','*');	
		expand_rel(p,'financiamientos','financiamientos','*');	
		p.clasificaciones= p.clasificaciones && p.clasificaciones.replace(/(\d)([a-z])/g,'$1 ; $1$2'); //XXX:hack horrible para incluir tema si hay subtema!
		expand_rel(p,'clasificaciones','clasificaciones','*');	
		p.publicaciones= {};
	});

	Object.values(D.pub).forEach(pu => {
		expand_rel(pu,'tipos_de_productos','tipos_de_productos','1');	
		expand_rel(pu,'autores','personas','*');	
		pu.url_adjunto ||= ('/uploads/productos/' + pu.nombre_adjunto);
		let pj_id= pu.id.split(/__/)[0];
		D.proy[pj_id].publicaciones[pu.id]= pu;
	});

	if (cb) {
		for (let p of Object.values(D.proy)) { await cb(p); }
	}
}
//YAML }

const PFX='/aa/xyaml';
import slugify from 'slugify';
window.slugify= slugify;
window.ser= (o) => JSON.stringify((typeof(o)=="object" && !Array.isArray(o)) ? sort_kv(o) : o,0,2);
window.get_file_tsv= get_file_tsv;

