import { InputSizeType } from "@project/components/src/ui-kit/Icon";



export interface IconButtonPropsType  {
    id?:string;
    className?:string;
    src:string;
    alt?:string;
    size?: InputSizeType;
    onClick?: (id:string)=>void;
}