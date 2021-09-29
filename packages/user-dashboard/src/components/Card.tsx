import { FunctionalComponent } from "preact";



const CARD_SIZES = {
    'large': "w-full max-w-card-large",
}

type CardSizeType = keyof typeof CARD_SIZES;

interface PropsType  {
    className?:string;
    size?: CardSizeType;
}

export const Card: FunctionalComponent<PropsType> = ({ className="", size="large" , children }) => {
    const classes = [
        "p-4 rounded-md border-1 border-caption shadow",
        CARD_SIZES[size],
        className ? className : "",
    ].join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};