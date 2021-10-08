export type InputTypeType = "text"|"email"|"tel"|"password";
export type InputTagType = "input"|"textarea";

export interface InputPropsType  {
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