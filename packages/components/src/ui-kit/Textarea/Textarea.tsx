import React, { FunctionComponent } from "react";
import { Text } from "@project/components/src/ui-kit/Text";
import { TextareaPropsType } from "./_types";
import cn from "classnames"


export const Textarea:FunctionComponent<TextareaPropsType> = 
({className,label,value,placeholder,isError=false, helperText="",rows, ...fields })=>{

    const textColor = isError ? 'error': 'help'

    return <div className={`flex flex-col ${className}`}>
        {label && <Text className="mb-2" text={label} color={textColor} size="caption"/>}
        <textarea 
            className={cn(
                'p-1 px-4 border border-bdsecondary rounded-sm focus:border text-small' ,
                isError ? 
                    'text-red-600 focus:text-red-600 border-red-200 focus:border-red-400': 
                    'text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400',
            )} 
            value={value} 
            placeholder={placeholder} 
            rows={rows} 
            {...fields}
        />
        {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption"/>}
    </div>
}