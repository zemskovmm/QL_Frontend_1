export type InputTypeType = "text"|"email"|"tel"|"password";

export interface InputPropsType  {
    className?:string;
    label?: string;
    value?:string;
    placeholder?:string;
    isError?: boolean;
    helperText?: string;
    type?: InputTypeType;
}