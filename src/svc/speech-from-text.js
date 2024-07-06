//============================================================
//S: speech
//OjO! si no es https devuelve texto vacio!
//DWIMER

const TTS= window.speechSynthesis
export function speech_from_text_p(msg) { //A: lee en voz alta
  //SEE: https://www.npmjs.com/package/cordova-plugin-texttospeech
  if (typeof(msg)!='object') { msg= {text: (msg||'')+''} }
  //A: msg es un kv
  msg= Object.assign({lang: 'es-AR', rate: 0.75}, msg);

  return new Promise( (onOk,onError) => {
		const utterance= new SpeechSynthesisUtterance();
    utterance.text= msg.text;
    utterance.locale= msg.lang;
    utterance.rate= msg.rate;
    TTS.speak(utterance)
	});
}


