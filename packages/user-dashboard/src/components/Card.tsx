import { FunctionalComponent } from "preact";



const CARD_SIZES = {
    'default': "w-full laptop:w-card ",
}

type CardSizeType = keyof typeof CARD_SIZES;

interface PropsType  {
    className?:string;
    size?: CardSizeType;
}

export const Card: FunctionalComponent<PropsType> = ({ className="", size="default" , children }) => {
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