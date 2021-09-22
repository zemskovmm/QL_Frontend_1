import {
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel,
    InputProps,
  } from "@material-ui/core";
import { FunctionalComponent} from "preact";
import { Controller} from "react-hook-form";

type PropsType={
    name: string;
    label: string;
    control: any;
    type: "text"|"email"|"tel"|"password";
}

export const QLInput:FunctionalComponent<PropsType> = ({ name, label, control, type})=>{
    return <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={ ({ field, fieldState: {invalid, error} }) => (
            <FormGroup>
                <FormControl>
                    <InputLabel>{label}</InputLabel>
                    <Input {...field} type={type} error={invalid} />
                    {invalid  && <FormHelperText error={invalid}>{error.message}</FormHelperText>}
                </FormControl>
            </FormGroup>
        )}
    />
}