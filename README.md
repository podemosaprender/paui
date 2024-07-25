#INFO: A portable, general UI (text, images, git, audio, QR, keys, ...)

## We have

* Works offline, persistent storage with lightning-fs and intercepting fetch in ServiceWorker
* Shown as target for Share from other apps (when installed, android)
* Files can be uploaded from the UI too using the same URL

## Devel

SEE: https://vite-pwa-org.netlify.app/

Must be served from valid cert httpS if you want to install in your mobile and work offline.

Can be inspected with Chromium.



### WebWorkers

SEE: https://github.com/mathe42/vite-plugin-comlink
SEE: https://github.com/GoogleChromeLabs/comlink?tab=readme-ov-file

### Crypto

SEE: Browser https://mdn.github.io/dom-examples/web-crypto/derive-key/index.html (view source, the js script js is simple)
SEE: Node https://nodejs.org/api/webcrypto.html#web-crypto-api

### Git

SEE: @isomorphic-git/lightning-fs

### WIP

~~~
msg= {m: '{"i":"xtest1","k":"eyJrZXlfb3BzIjpbInZlcmlmeSJdLCJl","t":"2024-07-10T20:38:53.021Z","ch":"xtest-s1","d":{"name":"Pepon","contact_mail":"m@mauriciocap.com","color_primary":"00529c","logo_emoji":"😎","logo_line1":"Una Sola"}}', s: "J6kn6tO5/UPp4P5SA7JrjU+/lmDrIrSVzDagyLzGbqvcA8Shfho63ndY5J3olsiOn0RlGdgQvacyjaE0aDjbOunWDiKgoYaINml+A0hgiqvgQy2Mikj+4hljFKcKTVnq"}
msgs= JSON.stringify(msg)
xa= btoa(unescape(encodeURIComponent(msgs))) //A: lucha con bash read, comillas, json, utf ...
await fetch('https://t3st.o-o.fyi/xp.cgi',{method:'POST', body: xa}).then(r => r.text())
~~~
await fetch('https://api1.o-o.fyi/x.cgi',{method: "POST", body: JSON.stringify({x: "hola"})}).then(r => r.text())
~~~

#### GIT

En la pwa genero una clave, la doy de alta en https://docs.google.com/spreadsheets/d/1s8v-UkGLNwKXx7JX-BpYMcc7HPo0pkVIDWB8NrHbbLQ/edit?pli=1&gid=739958532#gid=739958532

En el navegador firmo un mensaje y lo preparo para enviar (deberia usar la clave que genere con la pwa)
~~~
msg= {m: '{"i":"xtest1","k":"eyJrZXlfb3BzIjpbInZlcmlmeSJdLCJl","t":"2024-07-10T20:38:53.021Z","ch":"xtest-s1","d":{"name":"Pepon","contact_mail":"m@mauriciocap.com","color_primary":"00529c","logo_emoji":"😎","logo_line1":"Una Sola"}}', s: "J6kn6tO5/UPp4P5SA7JrjU+/lmDrIrSVzDagyLzGbqvcA8Shfho63ndY5J3olsiOn0RlGdgQvacyjaE0aDjbOunWDiKgoYaINml+A0hgiqvgQy2Mikj+4hljFKcKTVnq"}                                   
msgs= JSON.stringify(msg)                                                                                                              
xa= btoa(unescape(encodeURIComponent(msgs))) 
~~~

En mensaje encoded es mi token para git
~~~
TOK="" #el mensaje del paso anterior
git clone https://x:$TOK@t3st.o-o.fyi/git/x0 #XXX: nombre en el servidor en REPOS
~~~

# ZIP

https://gildas-lormeau.github.io/zip.js/ (ver source "Create a zip file")

# Splitting

https://blog.logrocket.com/react-dynamic-imports-route-centric-code-splitting-guide/

