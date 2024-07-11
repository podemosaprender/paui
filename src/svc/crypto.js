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
import * as util from './util';

function deriveSecretKey(privateKey, publicKey) {
	return globalThis.crypto.subtle.deriveKey(
		{ name: "ECDH", public: publicKey, },
		privateKey,
		{ name: "AES-GCM", length: 256, },
		false,
		["encrypt", "decrypt"],
	);
}

async function passToKey(plainTextPass, salt= null) { //U: safe (AES) key from plain text pass, eg to encrypt store
	//SEE: https://github.com/mdn/dom-examples/blob/4c1e311b6cd3bb3b25dc3ea0e0bc48f9e4e5eccb/web-crypto/derive-key/pbkdf2.js#L64
	//SEE: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#pbkdf2_2
	try {
		const enc = new TextEncoder();
		const keyMaterial= await globalThis.crypto.subtle.importKey( //SEC! DON'T USE as key, it's only the input bytes!
			"raw", enc.encode(plainTextPass),
			"PBKDF2", false, ["deriveBits", "deriveKey"],
		);
		const salt= globalThis.crypto.getRandomValues(new Uint8Array(16));
		console.log({keyMaterial, salt})
		const key = await globalThis.crypto.subtle.deriveKey(
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

const T_ECDSA={name:"ECDSA",namedCurve:"P-384", hash: { name: "SHA-384" }, } //A: algorithm MUST work with usage, ECDSA for signing, ECDH for encryption
async function genKeypairSign() { //U: for signatures, ECDSA
	let keyPair = await globalThis.crypto.subtle.generateKey( T_ECDSA, true, ["sign", "verify"],);
	return keyPair;
}

const EXPORT_FMT='jwk'
async function exportKey(k) {
 const ke= await globalThis.crypto.subtle.exportKey(EXPORT_FMT, k)
 return util.enc_b64u(util.ser(ke)); //XXX: export only required fields
}

async function importKey(k_exp_s,uses) {
	let k_exp= util.ser_r(util.enc_b64u_r(k_exp_s));
	//DBG: console.log({k_exp})
	return await globalThis.crypto.subtle.importKey(EXPORT_FMT,k_exp,T_ECDSA,true,uses);
}

async function signatureFor(msg,privateKey) {
	let encoded= (new TextEncoder()).encode(msg);
	let signature = await globalThis.crypto.subtle.sign( T_ECDSA, privateKey, encoded,);
	return signature;
}

async function sign(msg, privateKey) {
	let msg_s= util.ser(msg)
	let sig= await signatureFor(msg_s, privateKey)
	let sig_b64= util.enc_b64u(sig) 
	return JSON.stringify({m: msg_s, s: sig_b64});
}

async function verify(signed_s,publicKey) {
	let signed= JSON.parse(signed_s);
	let sig_read_s= util.enc_b64u_r(signed.s)
	let sig_read= util.uint8ArrayToStr_r(sig_read_s);
	
	//DBG: console.log({signed, sig_read})

	let encoded= (new TextEncoder()).encode(signed.m);
	let r = await globalThis.crypto.subtle.verify(T_ECDSA, publicKey, sig_read, encoded);
	return r ? util.ser_r(signed.m) : 'ERROR';
}

async function encrypt(plaintext, salt, iv) {
	return globalThis.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
}

export { passToKey, genKeypairSign, exportKey, importKey, sign, verify }

//S: main node ***********************************************

