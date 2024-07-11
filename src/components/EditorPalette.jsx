import { useState, useEffect, useCallback } from 'react'

import { ColorPicker } from 'primereact/colorpicker';
import { InputSelectOneRadio } from './controls/InputSelectOneRadio';
import * as paletteGen from 'src/svc/palette';

export function EditorPalette() {
	const [color, setColor] = useState(null);
	const [scheme, setScheme]= useState(null);
	const [palette, setPalette]= useState(null);

	const onParamsChange= (e) => {
		let primary= color, ascheme= scheme; //DFLT
		if (paletteGen.Schemes.indexOf(e.value)>-1) { ascheme= e.value; setScheme(ascheme) }
		else { primary= e.value; setColor(primary); }
		console.log({primary, ascheme})
		setPalette( paletteGen.palette({primary, scheme: ascheme}) )	
	}

	return (<div>
		{ palette && paletteGen.Colors.map( (k) => ( 
			<div key={k}><div style={{width: "4rem", display: "inline-block"}}>{k}:</div>
				{ Object.entries(palette[k]||{}).map( ([n,rgb]) => (
					<div key={k+'_'+n} style={{ display: "inline-block", width: "3rem", height: "1.5rem", background: '#'+rgb }}>{n}</div>
				)) }
			</div>
		)) }
		<div className="card flex justify-content-center">
			<ColorPicker value={color} onChange={onParamsChange} inline />
			<InputSelectOneRadio options={paletteGen.Schemes} onChange={onParamsChange} value={scheme}/>
		</div>
	</div>)
}

