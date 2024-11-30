import { apic_set_file, apic_get_file } from 'src/svc/api'
import { parse_tsv } from 'src/rte/lib/util';

//XXX:LIB { U: planilla google
export const get_http= async (url,fp) => { //XXX:mfetch, agregar proxy?
	let urlPx= 'https://proxy.o-o.fyi/' + url.replace(/^https?:\/\//,''); //encodeURIComponent(url);
	let x= await fetch(urlPx).then(r => r.blob())
	apic_set_file(fp,x);
	console.log("saved "+fp);
}
window.get_http= get_http;

export const url='https://docs.google.com/spreadsheets/d/e/2PACX-1vSA4XW7aPv5E7QOpMYk1vYuk_DY3xtbG4TY-oWomKojuaeJh4apwF1PfTx6ElQe7AQIvD0egAH33lWs/pub?gid=1828880156&single=true&output=tsv' //XXX:CFG
export const get_tsv= async () => {
	let x= await fetch(url).then(r => r.text())
	await apic_set_file('links.tsv',x);
	console.log("saved links.tsv",x);
	let links_data= parse_tsv(x);
	await Promise.all(links_data.slice(1).map( async r => {
		if (r[0]!='links' && r[1].startsWith('http')) {
			console.log("download",r);
			return await get_http(r[1],'ries_'+r[0]);
		}
	}));
}


export const get_zip= async () => {
	const zip_url='https://drive.usercontent.google.com/download?id=1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW&export=download&authuser=0' //FROM browser 'https://drive.google.com/file/d/1Oes5jM4mlNUdsMI2Amz6-aXkpPYdCJXW/view?usp=sharing'
	await get_http(zip_url,'xz1.zip')
}
//XXX:LIB }


