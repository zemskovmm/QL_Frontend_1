declare module '@ckeditor/ckeditor5-build-classic' { 
	const ClassicEditor: any;
	export = ClassicEditor;
}

declare module '@ckeditor/ckeditor5-build-decoupled-document' { 
	const DecoupledEditor: any;
	export = DecoupledEditor;
}


declare module '@ckeditor/ckeditor5-react' {
	type PropsTypes = {
		editor?:  ClassicEditor;
		data?: string;
		onChange?: (event:any, editor:any) => void;
		onReady?: (editor:any) => void;
	}

    export class CKEditor extends React.Component<PropsTypes> {
        constructor(
			props: PropsTypes
		) 
    }
}
