
import { FunctionalComponent} from "preact";
import { Controller} from "react-hook-form";

type PropsType={
    name: string;
    label: string;
    control: any;
    type: "text"|"email"|"tel"|"password";
}

export const Input:FunctionalComponent<PropsType> = ({ name, label, control, type})=>{
    return <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={ ({ field, fieldState: {invalid, error} }) => (
            <div className="p-1">
                <div>
                    <input {...field} type={type} placeholder={label}/>
                </div>
                {invalid && <div> {error.message} </div>}
            </div>
        )}
    />
}