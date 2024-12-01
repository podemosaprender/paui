import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'; 

import { Button } from 'primereact/button';

import { useCodeMirror } from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { yaml } from '@codemirror/lang-yaml';
import { languages } from '@codemirror/language-data';

import { Vim, vim, getCM } from "@replit/codemirror-vim"

export function Editor({fp, value, onChange, onClose}) {
	const onChangeImpl = useCallback((val, viewUpdate) => {
		onChange && onChange(val);
	}, [onChange]);

	const editor = useRef();

	const { setContainer, view } = useCodeMirror({
		container: editor.current,
		value: value,
		onChange: onChangeImpl,
		height: "70vh",
		extensions: [
			vim(),
			markdown({ base: markdownLanguage, codeLanguages: languages }),
			yaml(),
			EditorView.lineWrapping,
		],
		theme: "dark",
		options:{
			highlightActiveLineGutter: true,
			bracketMatching: true,
			autocompletion: true,
			tabSize: 2,
			lineWrapping: true,
			firstLineNumber: 10,
		}
	});

	window.xv= view;
	window.xgetCM= getCM;
	window.xvim= Vim;

  useEffect(() => { if (editor.current) { setContainer(editor.current); } }, [editor.current]);

	return (<div>
		<div className="flex gap-2">
			<Button label="ESC" onClick={ () => {
				Vim.handleKey(getCM(view),'<Esc>')
				view.focus();
			}} />
			<Button label="CLOSE" onClick={() => onClose(fp)} />
		</div>
		<div ref={editor} />
	</div>);
}

