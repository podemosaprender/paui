import React, { useRef, useState, useEffect } from 'react';

import { Button } from 'primereact/button';

import { on_generate_html } from 'src/svc/generate';
import { get_tsv } from 'src/svc/sync';

export function Generator() {
	return (<div>
		<ul>
			<li><Button icon="pi pi-arrow-down" onClick={get_tsv} />Download Google TSV</li>
			<li><Button icon="pi pi-arrow-left" onClick={on_generate_html} />Generate HTML</li>
		</ul>
	</div>)
}
