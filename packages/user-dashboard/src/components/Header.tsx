
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Continer } from "components/Continer";
import { useRootContext } from "components/RootContext";
import { Link } from "preact-router";
import { SIGN_IN_ROUTE } from "constants/Routes";
import { observer } from 'mobx-react-lite';
import { Button } from "./Button";

type PropsType = {
    title: string;
};

export const Header: FunctionalComponent<PropsType> = observer(({ title }) => {
    const { isLogined, isUnlogined, logoutAction } = useRootContext();

    return (
        <Continer className="shadow flex justify-between">
            <img className="object-none" src={QuarterLatinIcon} />
            { isLogined && 
                <Button text="Выход" color="secondary" onClick={logoutAction}/> 
            }
            { isUnlogined && 
                <Link href={SIGN_IN_ROUTE}>
                    <Button text="Войти" color="secondary" />
                </Link>
            }
        </Continer>
    );
});