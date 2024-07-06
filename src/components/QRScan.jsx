//INFO: pure js QR code scan for key sharing
import React, { useState, useCallback, useEffect, useRef } from 'react'; 

//SEE: https://github.com/nimiq/qr-scanner?tab=readme-ov-file#setup
import QrScanner from 'qr-scanner';
import './QRScan.css';

//SEE: https://dev.to/yusufginanjar/how-to-implement-qr-scanner-in-reactjs-ao7
export function QRScan() {
	// QR States
	const scanner = useRef();
	const videoEl = useRef(null);
	const qrBoxEl = useRef(null);
	const [qrOn, setQrOn] = useState(true);

	// Result
	const [scannedResult, setScannedResult] = useState("");

	// Success
	const onScanSuccess = (result) => {
		console.log(result);
		setScannedResult(result?.data);
	};

	const onScanFail = (err) => {
		console.log(err);
	};

	useEffect(() => {
		if (videoEl?.current && !scanner.current) {
			scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
				onDecodeError: onScanFail,
				preferredCamera: "environment", //U: "environment"= back camera, "user"= front camera.
				highlightScanRegion: true, //U: position our "QrFrame.svg" so user can only scan when qr code is there.
				highlightCodeOutline: true,
				overlay: qrBoxEl?.current || undefined,
			});

			scanner?.current
				?.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false);
				});
		}


		return () => {// A: remove QR Scanner from rendering and using camera when  closed or removed from UI.
			if (!videoEl?.current) {
				scanner?.current?.stop();
			}
		};
	}, []);

	useEffect(() => { //A: If "camera" is not allowed in browser permissions, show an alert.
		if (!qrOn)
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
			);
	}, [qrOn]);

	return (
		<div className="qr-reader">
			{/* QR */}
			<video ref={videoEl}></video>
			<div ref={qrBoxEl} className="qr-box">
				{!videoEl?.current && (
					<img
						src="/static/img/icons/scan_qr1.svg"
						alt="Qr Frame"
						width={256}
						height={256}
						className="qr-frame"
					/>
				)}
			</div>

			{scannedResult && (
				<p
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 99999,
						color: "white",
					}}>
					Scanned Result: {scannedResult}
				</p>
			)}
		</div>
	);
}
