
import { FunctionalComponent} from "preact";
import { Controller} from "react-hook-form";
import { Input, InputTagType, InputTypeType } from "components/Input";

type PropsType={
    className?:string;
    name: string;
    label?: string;
    placeholder?:string;
    control: any;
    type?: InputTypeType;
    tag?: InputTagType;
    rows?: number;
}

export const InputControlled:FunctionalComponent<PropsType> = ({className, name, label, placeholder, control, type, tag,rows})=>{
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
                isError={invalid}
                tag={tag}
                rows={rows}/>
        )}
    />
}