import React, { FC,KeyboardEvent } from "react";
import { Text } from "@project/components/src/ui-kit/Text";
import { TextareaPropsType } from "./_types";
import cn from "classnames"


export const Textarea:FC<TextareaPropsType> = 
({className,label,value,placeholder,isError=false, helperText="",rows,onPressEnter, ...fields })=>{

    const textColor = isError ? 'error': 'help'


    const handleKeyPress = (event:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(event.key=='Enter'){
            event.preventDefault();
            onPressEnter && onPressEnter()
        }
    }

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
            onKeyPress={handleKeyPress}
            placeholder={placeholder} 
            rows={rows} 
            {...fields}
        />
        {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption"/>}
    </div>
}