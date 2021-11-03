import { FunctionalComponent } from "preact";

interface PropsType  {
    className?:string;
}

export const Container: FunctionalComponent<PropsType> = ({ className="", children }) => {
    return (
        <div className={`m-auto max-w-300 w-full ${className}`}>
            {children}
        </div>
    );
};
