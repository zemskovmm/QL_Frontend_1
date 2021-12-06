
export interface TextareaPropsType  {
    className?:string;
    label?: string;
    value?:string;
    placeholder?:string;
    isError?: boolean;
    helperText?: string;
    rows?: number;
    iconSrc?:string;
    onIconClick?:()=>void
    onPressEnter?:()=>void
    onChangeText?:(text:string)=>void;
}