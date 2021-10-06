
import { FunctionalComponent} from "preact";

import { Text } from "components/Text";

export type InputTypeType = "text"|"email"|"tel"|"password";
export type InputTagType = "input"|"textarea";

interface PropsType  {
    className?:string;
    label?: string;
    value?:string;
    placeholder?:string;
    isError?: boolean;
    helperText?: string;
    type?: InputTypeType;
    tag?: InputTagType;
    rows?: number;
}

export const Input:FunctionalComponent<PropsType> = 
({className,label,value,placeholder,isError=false, helperText="", type, tag="input",rows, ...fields })=>{
    
    const inputClass = [
        'p-1 px-4 rounded-sm border-2 focus:border-2 text-small' ,
        isError ? 
            'text-red-600 focus:text-red-600 border-red-200 focus:border-red-400' : 
            'text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400',
    ].join(' ')

    const textColor = isError ? 'error': 'caption'

    return <div className={`flex flex-col ${className}`}>
        {label && <Text className="mb-2" text={label} color={textColor} size="caption"/>}
        { tag === 'input' ? 
            <input className={inputClass} type={type} value={value} placeholder={placeholder} {...fields}/> :
            <textarea className={inputClass} type={type} value={value} placeholder={placeholder} rows={rows} {...fields}/>
        }
        {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption"/>}
    </div>
}