import React, { useState, useCallback } from 'react'; 

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import { Vim, vim } from "@replit/codemirror-vim"
Vim.vimKeyFromEventOri= Vim.vimKeyFromEvent
Vim.vimKeyFromEvent= (e,vim) => {
	//DBG: console.log(e); alert('CODE '+e.key.charCodeAt(0))
	if (e.key=='^') { e= {...e, key: 'Escape', charCode: 0, keyCode: 27} }
	return Vim.vimKeyFromEventOri(e,vim);
} //A: use ^ as ESC on android GBoard

export function Editor({value, onChange}) {
	const onChangeImpl = useCallback((val, viewUpdate) => {
		onChange(val);
	}, [onChange]);

	return (<>
			<CodeMirror
				value={value}	
				onChange={onChangeImpl} 
				height="70vh" 
				extensions={[
					vim(),
					markdown({ base: markdownLanguage, codeLanguages: languages }),
				]} 
				theme="dark"
				basicSetup={{
					highlightActiveLineGutter: true,
					bracketMatching: true,
					autocompletion: true,
					tabSize: 2,
					lineWrapping: true,
				}}
			/>
		</>)
}

