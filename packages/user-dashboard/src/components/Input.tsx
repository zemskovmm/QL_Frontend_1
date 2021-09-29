
import { FunctionalComponent} from "preact";

import { Text } from "components/Text";

export type InputTypeType = "text"|"email"|"tel"|"password";

interface PropsType  {
    className?:string;
    label?: string;
    value?:string;
    placeholder?:string;
    isError?: boolean;
    helperText?: string;
    type?: InputTypeType;
}

export const Input:FunctionalComponent<PropsType> = 
({className,label,value,placeholder,isError=false, helperText="", type, ...fields })=>{
    
    const inputClass = [
        'my-1 p-1 px-4 rounded-sm border-2 focus:border-2 text-small' ,
        isError ? 
            'text-red-600 focus:text-red-600 border-red-200 focus:border-red-400' : 
            'text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400',
    ].join(' ')

    const textColor = isError ? 'error': 'caption'

    return <div className={`flex flex-col py-1 ${className}`}>
        {label && <Text className="my-1" text={label} color={textColor} size="caption"/>}
        <input className={inputClass} type={type} value={value} placeholder={placeholder} {...fields}/>
        {helperText && <Text className="my-1" text={helperText} color={textColor} size="caption"/>}
    </div>
}