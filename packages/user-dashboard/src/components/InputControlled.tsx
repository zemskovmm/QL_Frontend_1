
import { FunctionalComponent} from "preact";
import { Controller} from "react-hook-form";
import { Text } from "components/Text";
import { Input, InputTypeType } from "components/Input";

type PropsType={
    className?:string;
    name: string;
    label?: string;
    placeholder?:string;
    control: any;
    type?: InputTypeType;
    
}

export const InputControlled:FunctionalComponent<PropsType> = ({className, name, label, placeholder, control, type})=>{
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