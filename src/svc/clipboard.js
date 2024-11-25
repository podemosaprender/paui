//INFO: encapsulate clipbloard access

export function toClipboard(txt) {
	return navigator.clipboard.writeText(txt);
}
