
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Continer } from "components/Continer";
import { useRootContext } from "components/RootContext";
import { Link } from "preact-router";
import { SIGN_IN_ROUTE } from "constants/Routes";
import { observer } from 'mobx-react-lite';

type PropsType = {
    title: string;
};

export const Header: FunctionalComponent<PropsType> = observer(({ title }) => {
    const { isLogined, isUnlogined } = useRootContext();

    return (
        <Continer className="shadow flex justify-between">
            <img className="object-none" src={QuarterLatinIcon} />
            { isLogined && <button>Logout</button> }
            { isUnlogined && 
                <Link href={SIGN_IN_ROUTE}>
                    <button className="m-2">login</button>
                </Link>
            }
        </Continer>
    );
});