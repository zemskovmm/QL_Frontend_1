
import { FunctionalComponent} from "preact";

type TextTagPropsType = {
    className: string;
    value: string;
}

const TEXT_TAGS:{ [key:string]:FunctionalComponent<TextTagPropsType> } = {
    "h1": ({className, value}) => <h1 className={className}>{value}</h1>,
    "h2": ({className, value}) => <h2 className={className}>{value}</h2>,
    "h3": ({className, value}) => <h3 className={className}>{value}</h3>,
    "h4": ({className, value}) => <h4 className={className}>{value}</h4>,
    "h5": ({className, value}) => <h5 className={className}>{value}</h5>,
    "h6": ({className, value}) => <h6 className={className}>{value}</h6>,
    "span": ({className, value}) => <span className={className}>{value}</span>,
    "a": ({className, value}) => <a className={className}>{value}</a>,
}

const TEXT_COLORS = {
    "caption": "text-caption",
    "primary": "text-primary",
    "error": "text-error",
}

const TEXT_SIZES = {
    'caption': "text-xs",
    'default': "text-base",
}
    
type TextTagType = keyof typeof TEXT_TAGS;
type TextColorType = keyof typeof TEXT_COLORS;
type TextSizeType = keyof typeof TEXT_SIZES;


type PropsType = {
    className?:string;
    /** Отображаемый текст */
    text: string;
    /** Цвет текста */
    color?: TextColorType;
    /** Размер текста */
    size?: TextSizeType;
    /** Тег который добавится в html */
    tag?: TextTagType;
    
};

export const Text:FunctionalComponent<PropsType> = 
    ({className, text, color='primary', size='default', tag='span'})=>{

    const Tag = TEXT_TAGS[tag];
    const classes = [
        TEXT_COLORS[color],
        TEXT_SIZES[size],
        className ? className : "",
    ].join(' ');

    return <Tag className={classes} value={text}/>
}