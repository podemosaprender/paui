/** INFO: WebRTC peerjs transport
* SEE: https://github.com/peers/peerjs#setup
* SEE: https://peerjs.com/docs/#peeron
* SEE: https://peerjs.com/docs/#dataconnection-on
*/
import { Peer } from 'peerjs';

let _myCx;
/**
 * peerId -> connection
 */
let _peerCx= {}

//XXX:MOVER_A_LIB {
const new_message= () => ({t: 'msg'});
//XXX:MOVER_A_LIB }

/** accept connections with myId
* @param myId: string with the nick/id other users recognize
*/
export function open(myId, onData) {
	_myCx= new Peer(myId, {
		//XXX: host: location.host, //U: puede ser otro ej 'call-s.podemosaprender.org',
		host: 'call-s.podemosaprender.org',
		path:'/call', //U: coordinar con app.use en server!
		secure: true,
		debug: 3, //SEE: https://peerjs.com/docs/#peer-options-debug
		token: `${myId}__${new Date().toJSON().slice(0,10)}` //XXX: can REUSE same id while presentin same token, use AUTH
	});
	console.log("PEER MY CX START");
	_myCx.on('open', function(id) {
		console.log('My peer ID is: ' + id);
		const msg= new_message();
		msg.type= "OPEN";
		msg.source= id;
		onData(msg);
	});
	_myCx.on('error', (err) => {
		const msg= new_message();
		msg.type= "ERROR";
		msg.source= myId;
		msg.payload= err;
		onData(msg) 
		//A: Can't connect to peer is reported here.
	})
	_myCx.on("connection", (cx) => { 
		console.log("PEER ON CX", cx);

		cx.on("open", () => {
			_peerCx[ cx.peer ]= cx;
			const msg= new_message();
			msg.source= cx.peer;
			msg.type= "PEER";
			cx.send(msg);
			onData(msg);
		});

		cx.on("data", (data) => { 
			console.log("PEER DATA",data); 

			let msg= new_message();

			if (typeof(data)=="object") { //A: ANY object will be considered a Message
				msg= Object.assign(msg, data)
			}

			onData(msg);
		});

		cx.on('error', (err) => {
			onData({t: 'error', id: cx.peer, err} ) 
		})

		cx.on('close', () => {
			onData({t: 'error', id: cx.peer, err: 'close'} ) 
		});
	});
}

/** send data to other peer based on their id
* @param data: any serializable type
* @param dstId: string with the nick/id other users recognize
*/
export async function send(data, dstId, onData) {
	const doSend= async (cx) => {
		console.log("PEER THEIR CX OK");
		try { await cx.send(data); }
		catch (ex) { console.log("PEER SEND ERROR",ex) }
	}

	//XXX: Check if connected, handle error, retry.
	let cx = _peerCx[dstId];
	console.log("Peer send cx", cx);
	if (cx) {
		await doSend(cx);
	} else {
		cx= _myCx.connect(dstId);//XXX: handle errors and timeouts
		console.log("PEER THEIR CX START");
		cx.on("open", async () => {
			_peerCx[dstId]= cx;
			await doSend(cx) 
		}); 
		cx.on("data", (data) => { 
			data.id= cx.peer;
			console.log("PEER DATA",data); 
			onData(data);
		});
		cx.on('error', (err) => {
			delete _peerCx[cx.peer];
			console.log("PEER ERROR");
			onData({t: 'error', id: cx.peer, err} ) 
		});
		cx.on('close', () => {
			delete _peerCx[cx.peer];
			console.log("PEER CLOSE");
			onData({t: 'error', id: cx.peer, err: 'close'} ) 
		});
	}
}

