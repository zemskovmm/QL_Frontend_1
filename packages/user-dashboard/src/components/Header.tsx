
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Continer } from "components/Continer";
import { Link } from "preact-router";
import { HOME_ROUTE, PROFILE_ROUTE, SIGN_IN_ROUTE } from "constants/Routes";
import { Button } from "./Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";



export const Header: FunctionalComponent= () => {
    const { isLogined, isUnlogined, logoutAction, user } = useUserStatuseStore();

    const profileName = user.lastName.length|user.firstName.length ? [ user.lastName, user.firstName ].join(' ') : "Профиль";
    console.log( "Header", user )

    return (
        <Continer className="shadow flex justify-between items-center">
            <Link href={HOME_ROUTE}>
                <img className="object-none" src={QuarterLatinIcon} />
            </Link>
            
            <div className="inline-flex gap-2">
                { isLogined && <>
                    <Link href={PROFILE_ROUTE}>
                        <Button text={profileName} color="secondary" />
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
};