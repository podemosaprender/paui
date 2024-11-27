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

const opts_for= (repo_url, dst, auth_opts={}) => {
	//SEE: https://isomorphic-git.org/docs/en/onAuth XXX:implementar
	//XXXcorsProxy: 'https://cors.isomorphic-git.org', //XXX:OPTIONAL? OURS?	fs,/XXX:MOVE to authOpts 
	console.log("GIT OPTS_FOR",{repo_url, dst, auth_opts});
	const authv=`Basic ${Buffer.from(`${auth_opts.username}:${auth_opts.password}`).toString('base64')}`;
	const headers= { Authentication: authv, Authorization: authv, };

	const opts= {
		onAuth: () => {console.log("onAuth", auth_opts); return auth_opts}, ...auth_opts, 
		headers,
		fs,
		http: { request: (o) => http.request({...o, headers: {headers,...o.headers}})} ,

		dir: dst,
		url: repo_url,
		ref: 'main',
		singleBranch: true,
		depth: 10,
	}
	console.log("GIT OPTS_FOR R",opts);
	return opts;
}

export async function git_clone(repo_url, dst, auth_opts={}) {
	console.log("GIT CLONE",{repo_url, dst, auth_opts});
	const clone_opts= opts_for(repo_url,dst,auth_opts);
	console.log("X",clone_opts)
	const r0= await git.clone(clone_opts);
	console.log("GIT CLONE R0",r0);
	const rfiles= await fsp.readdir(dst);
	console.log("GIT CLONE R FILES",dst,rfiles);
	return rfiles;
}


export async function git_file_add(repo_dir, filepaths) {
	//SEE: https://isomorphic-git.org/docs/en/add
	console.log("GIT add",{repo_dir,filepaths});
	const r0= await git.add({fs, dir: repo_dir, filepath: filepaths});
	console.log("GIT add R0",r0);
	return r0;
}

export async function git_commit(repo_dir, message, filepaths) {
	if (filepaths) { await git_file_add(repo_dir, filepaths); }
	const r0= await git.commit({fs, dir: repo_dir, message, author: {name: 'XXXWebApp', email: 'xxx@xxx.com'}});
	console.log("GIT commit R0",r0);
	return r0;	
}

export async function git_push(repo_url, dst, auth_opts={}) {
	console.log("GIT PUSH",{repo_url, dst, auth_opts});
	const push_opts= opts_for(repo_url,dst,auth_opts);
	const r0= await git.push(push_opts);
	console.log("GIT PUSH R0",r0);
	return r0;
}

