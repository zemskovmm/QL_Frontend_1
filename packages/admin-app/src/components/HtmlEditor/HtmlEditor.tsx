import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';

type PropsType = {
    className?: string;
    data: string;
    onChange: (value:string)=>void;
}

export const HtmlEditor: FunctionComponent<PropsType> = observer( 
    ( {className, data, onChange} ) => {
        return (
            <div className={`BasicHtmlBlockInfo ${className}`}>
                <CKEditor
                    editor={ DecoupledEditor }
                    data={ data }
                    onChange={ ( event, editor ) => {
                        onChange(editor.getData())
                    }}
                    onReady={ editor => {
                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    }}
                />
            </div>
            
        )
    }
);