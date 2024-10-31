//INFO: convertir lo que hicimos en nunjucks+11ty a un json simple de procesar

//S:LIB {
function parseJinjaLike(src,sfx='',dst={}) {
	if (!src.match(/\{%\s*macro/)) { src=`{% macro all() %}\n${src}\n{%endmacro%}` }
	//console.log(srcpath, src.length);
	src.replace(/\{%\s*macro\s+(\w+)\(([^)]*)\)\s*%}(.*?)\{%\s*endmacro\s*%\}/gsi, (_1,name,args_s,body) => {
		let args= args_s.trim().split(/\s*,\s*/).filter(s=>s)
		dst[name+sfx]= [name,args,parseJinkaLike_toLoL(body,name,args)];
	});
	return dst;
}

function parseJinjaLike_bodyToTok(body) {
	const DBG='';
	let tok= body
		.split(/(\{%.*?%\})/gsi)
		.map(l => {
			let m= l.match(/\{%-?\s*for\s+(.*?)\s+in\s+(.*?)\s+-?%\}/);
			if (m) { return ['for',m[2].trim(),m[1].trim().split(/\s*,\s*/)] }

			m= l.match(/\{%-?\s*if\s+(.*?)\s+-?%\}/);
			if (m) { return ['if',m[1].trim()] }

			m= l.match(/\{%-?\s*set\s+(\w+)\s*=\s*(.*?)\s+-?%\}/);
			if (m) { return ['set',m[1].trim(),m[2].trim()] }

			m= l.match(/\{%-?\s*end(\w+)\s*-?%\}/);
			if (m) { return ['end',m[1].trim()] } 

			m= l.match(/\{%-?\s*(.*?)\s+-?%\}/);
			if (m) { 
				if (m[1].trim()=='else') { return ['else'] }
				else { return ['CMD',m[1]] }
			}

			return l;
		});
	return tok;
}

function parseJinkaLike_toLoL(body,name,args) {
	let stackL2R= [[]];
	let tok= parseJinjaLike_bodyToTok(body);
	tok.forEach(tk => {
		if (typeof(tk)=="string") { stackL2R[0].push(tk) }
		else if (tk[0]=='end') { let tos= stackL2R.shift(); 
			let idxBlockStart= tos[0]=='ifelse' ? 4 : 3;
			stackL2R[0].push(tos.slice( 0, idxBlockStart ).concat([tos.slice(idxBlockStart)])); 
		}
		else if (tk[0]=='for' || tk[0]=='if') { stackL2R.unshift(tk) }
		else if (tk[0]=='else') { let bodyTrue= stackL2R[0].slice(2); stackL2R[0]=['ifelse',stackL2R[0][1], bodyTrue]; }
		else { stackL2R[0].push(tk) }
		//DBG: console.log("XXX:TOK",JSON.stringify(tk),JSON.stringify(stackL2R,0,2));
	});
	return stackL2R[0];
}
//S:LIB }

export { parseJinjaLike };
