import { useState, useEffect, useCallback } from 'react'

import { ColorPicker } from 'primereact/colorpicker';
import * as paletteGen from 'src/svc/palette';

export function EditorPalette() {
	const [color, setColor] = useState(null);
	const [palette, setPalette]= useState({});

	const onColorChange= (e) => {
		const primary= e.value;
		setColor(primary);
		setPalette( paletteGen.palette({primary}) )	
	}

	return (<div>
		{ Object.entries(palette).map( ([k,shades]) => ( 
			<div key={k}><div style={{width: "4rem", display: "inline-block"}}>{k}:</div>
				{ Object.entries(shades).map( ([n,rgb]) => (
					<div key={k+'_'+n} style={{ display: "inline-block", width: "3rem", height: "1.5rem", background: '#'+rgb }}>{n}</div>
				)) }
			</div>
		)) }
		<div className="card flex justify-content-center">
			<ColorPicker value={color} onChange={onColorChange} />
		</div>
	</div>)
}

