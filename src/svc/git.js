import FS from '@isomorphic-git/lightning-fs'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web'
import { Buffer } from 'buffer';
globalThis.Buffer= Buffer;

export const fs= new FS()
export const fsp= fs.promises
fs.init()
//window.fs= fs
//window.fsp= fsp


//SEE: https://isomorphic-git.org/docs/en/onAuth XXX:implementar
export const clone= async (repo_url, dst, auth_opts={}) => {
	//XXXcorsProxy: 'https://cors.isomorphic-git.org', //XXX:OPTIONAL? OURS?	fs,/XXX:MOVE to authOpts 
	console.log("GIT CLONE",{repo_url, dst, auth_opts});
	const headers= {
		Authentication: `Basic ${Buffer.from(`${auth_opts.username}:${auth_opts.password}`).toString('base64')}`,
		Authorization: `Basic ${Buffer.from(`${auth_opts.username}:${auth_opts.password}`).toString('base64')}`,
	};

	const clone_opts= {
		onAuth: () => {console.log("onAuth", auth_opts); return auth_opts}, ...auth_opts, 
		headers,
		fs,
		http: { request: (o) => http.request({...o, headers: {headers,...o.headers}})} ,
		dir: dst,
		url: repo_url,
		ref: 'main',
		singleBranch: true,
		depth: 10
	}
	console.log("GIT CLONE OPTS",clone_opts);
	const r0= await git.clone(clone_opts);
	console.log("GIT CLONE R0",r0);
	const rfiles= await fsp.readdir(dst);
	console.log("GIT CLONE R FILES",dst,rfiles);
}

