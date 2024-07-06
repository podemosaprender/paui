import FS from '@isomorphic-git/lightning-fs'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'

export const fs= new FS()
export const fsp= fs.promises
window.fs= fs
window.fsp= fsp
fs.init()

window.gitt0= async () => {
	const dir='/trepo';

	await git.clone({
		fs,
		http,
		dir,
		corsProxy: 'https://cors.isomorphic-git.org',
		url: 'https://github.com/isomorphic-git/isomorphic-git',
		ref: 'main',
		singleBranch: true,
		depth: 10
	});

	// Now it should not be empty...
	console.log(await fsp.readdir(dir))
}

//TODO: load as a service
/*
const wi = new ComlinkWorker(new URL('./worker-ex0.js', import.meta.url), {})
window.wi= wi;
*/
/* U: shared worker 
const wig = new ComlinkWorker(new URL('./worker-git.js', import.meta.url), {type: 'module'})
window.wig= wig;
*/ 


