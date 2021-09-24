
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";


type PropsType = {
    title: string;
};


export const Header: FunctionalComponent<PropsType> = ({ title }) => {
    return (
        <div className="p-6 px-20 shadow">
            
            <img src={QuarterLatinIcon} />
            
        </div>
    );
};