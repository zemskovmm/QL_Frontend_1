import React from 'react';
import {BlockTypeInfo, TypedBlockTypeInfo} from "./blocks-info";

export interface BasicHtmlBlockProps {
    html: string;
}

export const BasicHtmlBlockInfo: TypedBlockTypeInfo<BasicHtmlBlockProps> =
    {
        id: "basic-html",
        name: "Basic HTML",
        initialData: {
            html: "<b>Lorem ipsum</b> <i>dolor sit amet</i>"
        },
        definition: {
            fields: [
                {
                    id: "html",
                    name: "html",
                    type: "Custom",
                    customType: "Html"
                }
            ]
        },
        renderer: props => (<div dangerouslySetInnerHTML={{__html: props.html}}/>)
    };
