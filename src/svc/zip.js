//SEE: https://gildas-lormeau.github.io/zip.js/

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
 
//SEE: https://github.com/gildas-lormeau/zip.js/blob/gh-pages/demos/demo-read-file.js
*/

import * as zip from '@zip.js/zip.js';
export const new_zip_model = (() => {
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

/* TEST {
async function xgz(fcnt,ecnt) { xz= new_zip_model(); for (i=0;i<fcnt;i++) { if (i%1000==0) { console.log(i); } let a= []; for (j=0;j<ecnt;j++) {a.push("F"+i+":"+Math.random())}; await xz.addFile(new File([JSON.stringify(a)],"file"+i)) } }
async function xgzt ()  { await xgz(1000,3000); window.open(await xz.getBlobURL()) }
 */// TEST }

