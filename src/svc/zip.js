//SEE: https://gildas-lormeau.github.io/zip.js/

const DBG= 9;

/* USAGE
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
 
*/

import * as zip from '@zip.js/zip.js';
export const new_zip_model = () => {
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
		},
		async getBlob() {
			if (zipWriter) {
				const blob= await zipWriter.close();
				zipWriter = null;
				return blob;
			} else { throw new Error("Zip file closed"); }
		}
	}
}

/* TEST {
async function xgz(fcnt,ecnt) { xz= new_zip_model(); for (i=0;i<fcnt;i++) { if (i%1000==0) { console.log(i); } let a= []; for (j=0;j<ecnt;j++) {a.push("F"+i+":"+Math.random())}; await xz.addFile(new File([JSON.stringify(a)],"file"+i)) } }
async function xgzt ()  { await xgz(1000,3000); window.open(await xz.getBlobURL()) }
*/// TEST }

//SEE: https://github.com/gildas-lormeau/zip.js/blob/gh-pages/demos/demo-read-file.js
export function keys_zip(file, options) {
	return (new zip.ZipReader(new zip.BlobReader(file))).getEntries(options);
}

export async function get_file_zip(entry, options) {
	return await entry.getData(new zip.BlobWriter(), options);
}

export async function get_url_zip(entry, options) {
	return URL.createObjectURL(await entry.getData(new zip.BlobWriter(), options));
}

/* TEST {
 zb= await apic_get_file_blob('xz.zip')
 ze= await zip.keys_zip(zb)
 zf2= await zip.get_file_zip(ze[2])
 await zf2.text()
// TEST } */
if (DBG>5) {
	self.zip= { keys_zip, get_file_zip, get_url_zip }
}

