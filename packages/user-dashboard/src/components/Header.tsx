
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Continer } from "components/Continer";
import { useRootContext } from "components/RootContextProvider";
import { Link } from "preact-router";
import { PROFILE_ROUTE, SIGN_IN_ROUTE } from "constants/Routes";
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
            <div className="inline-flex gap-4">
                { isLogined && <>
                    <Link href={PROFILE_ROUTE}>
                        <Button text="Профиль" color="secondary" />
                    </Link>
                    <Button text="Выход" color="secondary" onClick={logoutAction}/> 
                </>}
                { isUnlogined && 
                    <Link href={SIGN_IN_ROUTE}>
                        <Button text="Войти" color="secondary" />
                    </Link>
                }
            </div>
            
        </Continer>
    );
});