import { apic_get_file, apic_set_file, apic_get_file_blob } from 'src/svc/api';

//S: util/zip {
import { keys_zip, get_file_zip } from 'src/svc/zip';

export async function zip_expand(zip_path, dst_path) {
	const zb= await apic_get_file_blob(zip_path)
	const ze= await keys_zip(zb)
	await Promise.all(ze.filter(e => (!e.filename.endsWith('/'))).map( async e => {
		apic_set_file(dst_path+'/'+e.filename, await get_file_zip(e))
	}));
}
//S: util/zip }

//S: util/tsv {
import { parse_tsv } from 'src/rte/lib/util'
export const get_file_tsv= async (apath) => {
	let src= await apic_get_file(apath)
	return parse_tsv(src);
}
//S: util/tsv }

