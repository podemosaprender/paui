//INFO: no app code here, only setup the framework

import React from 'react'
import ReactDOM from 'react-dom/client'
//S: prime {
import 'primeflex/primeflex.css'; //SEE: https://primereact.org/calendar/
import 'primeicons/primeicons.css'; //SEE: https://primereact.org/icons/#list
import 'primereact/resources/themes/lara-dark-purple/theme.css' //SEE: https://primereact.org/calendar/
//OPT: import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css'
import { PrimeReactProvider } from 'primereact/api';
// } prime

import {App} from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<PrimeReactProvider>
			<App/>
		</PrimeReactProvider>
  </React.StrictMode>,
)
