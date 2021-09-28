import { FunctionalComponent } from "preact";

interface PropsType  {
    className?:string;
}

export const Continer: FunctionalComponent<PropsType> = ({ className="", children }) => {
    return (
        <div className={`py-2 px-4 tablet:px-10 laptop:px-20 desktop:px-40 ${className}`}>
            {children}
        </div>
    );
};