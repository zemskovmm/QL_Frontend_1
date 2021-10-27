import { FunctionalComponent } from "preact";

interface PropsType  {
    className?:string;
}

export const Container: FunctionalComponent<PropsType> = ({ className="", children }) => {
    return (
        <div className={`m-auto py-2 max-w-320 w-full ${className}`}>
            {children}
        </div>
    );
};
