import React, { FC,KeyboardEventHandler } from "react";
import { Text } from "@project/components/src/ui-kit/Text";
import { IconButton } from "@project/components/src/ui-kit/IconButton";
import { TextareaPropsType } from "./_types";
import cn from "classnames"


export const Textarea:FC<TextareaPropsType> = 
({className,label,value,placeholder,isError=false, helperText="",rows, onPressEnter,iconSrc,onIconClick,onChangeText, ...fields })=>{

    const textColor = isError ? 'error': 'help'

    return <div className={`flex flex-col  ${className}`}>
        {label && <Text className="mb-2" text={label} color={textColor} size="caption"/>}
        <div className="relative h-full" >
            {iconSrc && <IconButton className="absolute top-1 left-1" src={iconSrc} size="7" onClick={onIconClick} />}
            <textarea 
                className={cn(
                    "w-full h-full",
                    'p-1 border border-bdsecondary rounded-sm focus:border text-small' ,
                    iconSrc ? 'pl-8': null,
                    isError ? 
                        'text-red-600 focus:text-red-600 border-red-200 focus:border-red-400': 
                        'text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400',
                )} 
                style={{resize:'none'}}
                value={value} 
                onKeyPress={(event)=>{
                    if(event.key=='Enter'){
                        event.preventDefault();
                        onPressEnter && onPressEnter()
                    }
                }}
                placeholder={placeholder} 
                rows={rows} 
                onChange={(e)=>onChangeText?onChangeText(e.currentTarget.value):null}
                {...fields}
            />
        </div>
        
        {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption"/>}
    </div>
}
