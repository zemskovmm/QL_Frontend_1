import React,{ FunctionComponent} from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@project/components/src/ui-kit/Textarea";

type PropsType={
    className?:string;
    name: string;
    label?: string;
    placeholder?:string;
    control: any;
    rows?: number;
    onPressEnter?:()=>void
    iconSrc?:string;
    onIconClick?:()=>void
}

export const TextareaControlled:FunctionComponent<PropsType> = ({className, name, label, placeholder, control, rows,iconSrc,onIconClick,onPressEnter})=>{
    return <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={ ({ field, fieldState: {invalid, error} }) => (
            <Textarea 
                className={className}
                {...field} 
                placeholder={placeholder} 
                label={label} 
                rows={rows} 
                helperText={error ? error.message:""} 
                isError={invalid}
                iconSrc={iconSrc}
                onIconClick={onIconClick}
                onPressEnter={onPressEnter}/>
        )}
    />
}