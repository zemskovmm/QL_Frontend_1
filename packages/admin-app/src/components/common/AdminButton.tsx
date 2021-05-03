import {MouseEventHandler} from "react";

interface AdminButtonProps {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: any;
    color: string;
    href?: string
}

export const AdminButton = (props: AdminButtonProps) => {
    var classes = "text-white font-bold py-2 px-4 rounded ";
    if (props.color == "primary")
        classes += "bg-blue-500 hover:bg-blue-100 hover:text-black";
    if (props.color == "success")
        classes += "bg-green-400 hover:bg-green-100 hover:text-black";
    if (props.color == "danger")
        classes += "bg-red-600 hover:bg-red-900";
    if (props.color == "success")
        classes += "bg-gray-400 hover:bg-gray-100 hover:text-black";
    return <a
        className={classes}
        href={props.href || '#'}
        onClick={e => {
            if(props.onClick != null) {
                props.onClick(e);
            }
            return false;
        }}
    >{props.children}</a>
}