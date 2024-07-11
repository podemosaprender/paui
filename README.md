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
await fetch('https://api1.o-o.fyi/x.cgi',{method: "POST", body: JSON.stringify({x: "hola"})}).then(r => r.text())
~~~
