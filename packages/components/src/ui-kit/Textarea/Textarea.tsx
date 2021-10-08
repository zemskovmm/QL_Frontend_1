import React, { FunctionComponent } from "react";
import { Text } from "@project/components/src/ui-kit/Text";
import { TextareaPropsType } from "./_types";



export const Textarea:FunctionComponent<TextareaPropsType> = 
({className,label,value,placeholder,isError=false, helperText="",rows, ...fields })=>{
    
    const inputClass = [
        'p-1 px-4 rounded-sm border-2 focus:border-2 text-small' ,
        isError ? 
            'text-red-600 focus:text-red-600 border-red-200 focus:border-red-400' : 
            'text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400',
    ].join(' ')

    const textColor = isError ? 'error': 'help'

    return <div className={`flex flex-col ${className}`}>
        {label && <Text className="mb-2" text={label} color={textColor} size="caption"/>}
        <textarea className={inputClass} value={value} placeholder={placeholder} rows={rows} {...fields}/>
        {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption"/>}
    </div>
}