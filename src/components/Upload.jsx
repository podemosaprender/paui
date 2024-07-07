import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

export function Upload() {
	const toast = useRef(null);

	const onUpload = () => {
		toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
	};

	return (
		<div className="card flex justify-content-center">
			<Toast ref={toast}></Toast>
			<FileUpload mode="basic" name="demo[]" url="./_share_target" accept="image/*" maxFileSize={10000000} onUpload={onUpload} auto chooseLabel="Browse" />
		</div>  
	)
}
