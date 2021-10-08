import React,{ FunctionComponent} from "react";
import { Controller } from "react-hook-form";
import { Input, InputTypeType } from "@project/components/src/ui-kit/Input";

type PropsType={
    className?:string;
    name: string;
    label?: string;
    placeholder?:string;
    control: any;
    type?: InputTypeType;
}

export const InputControlled:FunctionComponent<PropsType> = ({className, name, label, placeholder, control, type})=>{
    return <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={ ({ field, fieldState: {invalid, error} }) => (
            <Input 
                className={className}
                {...field} 
                placeholder={placeholder} 
                label={label} 
                type={type} 
                helperText={error ? error.message:""} 
                isError={invalid}/>
        )}
    />
}