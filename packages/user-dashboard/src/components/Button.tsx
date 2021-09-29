import { FunctionalComponent} from "preact";
import { Text } from "./Text";

const BUTTON_COLORS = {
    "default": "bg-button text-button-text",
    "secondary": "bg-button-secondary text-button-secondary-text",
}

const BUTTON_SIZES = {
    'default': "py-2 px-4",
}
    
type ButtonColorType = keyof typeof BUTTON_COLORS;
type ButtonSizeType = keyof typeof BUTTON_SIZES;


type PropsType = {
    className?:string;
    /** id кнопки */
    id?:string;
    /** Отображаемый текст */
    text: string;
    /** Тип кнопки */
    type?: "submit";
    /** Цвет кнопки */
    color?: ButtonColorType;
    /** Размер кнопки */
    size?: ButtonSizeType;
    /** Если кнопка не активна */
    disabled?: boolean;
    /** Событие нажатия */
    onClick?:(id?:string)=>void;
    
};

export const Button:FunctionalComponent<PropsType> = 
    ({className, id, text, type, color='default', size='default', disabled=false,onClick})=>{

    const classes = [
        'rounded text-medium w-full',
        BUTTON_COLORS[color],
        BUTTON_SIZES[size],
        className ? className : "",
    ].join(' ');

    const handleOnClick = ()=>{
        onClick && onClick(id)
    }

    return (
        <button className={classes} id={id} type={type} disabled={disabled} onClick={handleOnClick}>
            {text}
        </button>
    )
}