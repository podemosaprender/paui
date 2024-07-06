//INFO: encapsulate encryption, signing and key generation

/* PLAN:
 CRITERIOS
 * paciente elige que comparte con quien encriptando y puede borrar
 * plausible deniability: la deduccion de que quieren decir esos bytes tiene que ser descartada por DUDOSA en tribunales

 * Quiero paciente sube mensaje a un canal, Dra baja y lee
  * OPCION ECDH clave paciente x clave CANAL (mejor)
	 * La clave es del CANAL, paciente se la comparte a todas las Dras que quiera ej via QR (mas seguro) o ECDH con la publica de cada Dra via servidor (mas riesgo, mas facil) La primera vez Dra puede crear y paciente scannear QR pero Dra se quedaria con la privada!
	 * Pueden usar ECDH como https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#ecdh_2

  * OPCION ECDH clave paciente x clave doctora
	 * Pueden usar ECDH como https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#ecdh_2
	 * Para eso c/u tiene que tener la publica del otro, que pueden obtener de un ID que conocen (via mail, etc) en el servidor_zk. El de la Dra puede ser pubico y su nombre por ej.
	 * XXX: el paciente deberia subir repetidos los mensajes encriptados para cada destinatario O pasar la privada del canal que armo usando la publica de cada Dra. (no esta bueno subir una privada aunque este encriptada)
	 * Si la Dra quiere acceder desde mas de un dispositivo podria pasar sus claves via QR
 
 SERVIDOR_SZ
 * Authentication: funciona en base a SIGN/VERIFY
	 * Usuaria se registra con id (no se puede pisar) y clave publica
	 * Firmando con las publicas para su id puede agregar y borrar otras publicas
   * Servidor puede requerir algun token para que no se registre cualquiera, lo genera quien invita
 * Authorization: funcionan en base a SIGN/VERIFY
   * dueña de un canal puede agregar y borrar (canal, operacion, userid)
	 * servidor valida cuando userid pide esa operacion (leer, escribir, etc.)
 * Para el servidor los mensajes son SOLO BYTES, PERO las aplicaciones pueden acordar que ej si en un canal escriben varios usarios algun prefijo identifica la clave que encripta el mensaje

 */
//SEE: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey

function deriveSecretKey(privateKey, publicKey) {
	return window.crypto.subtle.deriveKey(
		{ name: "ECDH", public: publicKey, },
		privateKey,
		{ name: "AES-GCM", length: 256, },
		false,
		["encrypt", "decrypt"],
	);
}

async function XXXWIP()  {
	alicesKeyPair = await window.crypto.subtle.generateKey(
		{
			name: "ECDH",
			namedCurve: "P-384",
		},
		true, //A: extractable
		["deriveKey"],
	);
	bobsKeyPair = await window.crypto.subtle.generateKey(
		{
			name: "ECDH",
			namedCurve: "P-384",
		},
		true,
		["deriveKey"],
	);
	window.crypto.subtle.exportKey("jwk",alicesKeyPair.publicKey) //A: json!
}

async function passToKey(plainTextPass, salt= null) { //U: safe (AES) key from plain text pass, eg to encrypt store
	//SEE: https://github.com/mdn/dom-examples/blob/4c1e311b6cd3bb3b25dc3ea0e0bc48f9e4e5eccb/web-crypto/derive-key/pbkdf2.js#L64
	//SEE: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#pbkdf2_2
	try {
		const enc = new TextEncoder();
		const keyMaterial= await window.crypto.subtle.importKey( //SEC! DON'T USE as key, it's only the input bytes!
			"raw", enc.encode(plainTextPass),
			"PBKDF2", false, ["deriveBits", "deriveKey"],
		);
		const salt= window.crypto.getRandomValues(new Uint8Array(16));
		console.log({keyMaterial, salt})
		const key = await window.crypto.subtle.deriveKey(
			{ name: "PBKDF2", salt, iterations: 100, hash: "SHA-256", },
			keyMaterial,
		  { name: "AES-GCM", length: 256 },	
			true,
			["encrypt", "decrypt"],
		);	
		console.log("K",{key})
		return key;
	}catch(ex) { console.log(ex) }
}

async function genKeypair() { //U: ECDH
	let keyPair = await window.crypto.subtle.generateKey(
		{
			name: "ECDSA", //A: algorithm MUST work with usage, ECDSA for signing, ECDH for encryption
			namedCurve: "P-384",
		},
		true,
		["sign", "verify"],
	);
	return keyPair;
}

async function exportKey(k) {
 const ke= await window.crypto.subtle.exportKey("jwk", k)
 return JSON.stringify(ke); //XXX: export only required fields
}


async function encrypt(plaintext, salt, iv) {
	return window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
}


export { passToKey, genKeypair, exportKey }
