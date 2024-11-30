//INFO: pwa services

// PWA handle files { XXX:LIB
async function handleFiles(files) {
	for (const file of files) {
		const blob = await file.getFile();
		//blob.handle = file;
		//const text = await blob.text();
		console.log(`${file.name} handled`);
	}
}

export function install_hanldeFiles() {
	if ('launchQueue' in window) { console.log('File Handling API is supported!');
		launchQueue.setConsumer(launchParams => { handleFiles(launchParams.files); });
	} else { console.error('File Handling API is not supported!'); }
}
// PWA handle files }

