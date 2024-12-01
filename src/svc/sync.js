import { apic_set_file, apic_get_file } from 'src/svc/api'
import { parse_tsv } from 'src/rte/lib/util';

//XXX:LIB { U: planilla google
export const get_http= async (url,fp,on_err) => { //XXX:mfetch, agregar proxy?
	on_err||=console.log;

	let urlPx= 'https://proxy.o-o.fyi/' + url.replace(/^https?:\/\//,''); //encodeURIComponent(url);
	let x= await fetch(urlPx).then(r => r.blob())
	await apic_set_file(fp,x);
	on_err("OK SAVED",{fname: fp, url});
	return x;
}
window.get_http= get_http;

export const get_tsv= async (url,pfx='sync_',on_err) => {
	let x= await get_http(url, pfx+'links.tsv', on_err).then(b => b.text());
	let links_data= parse_tsv(x);
	on_err("OK LINKS",{fname: pfx+'links.tsv', links_data});
	await Promise.all(links_data.map( async r => {
		if (r[0]!='links' && r[1].startsWith('http')) {
			return await get_http(r[1],pfx+r[0],on_err);
		}
	}));
}


export const get_zip= async () => {
	const zip_url='https://drive.usercontent.google.com/download?id=1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW&export=download&authuser=0' //FROM browser 'https://drive.google.com/file/d/1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW/view?usp=sharing'
	await get_http(zip_url,'xz1.zip')
}
//XXX:LIB }


