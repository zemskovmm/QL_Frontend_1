
import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Continer } from "components/Continer";
import { Link } from "preact-router";
import { useRouterStore } from "stores/RouterStore";
import { Button } from "@project/components/src/ui-kit/Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { changeLangInUrl, LANGS_VARIANT } from "locales/utils";

export const Header: FunctionalComponent= () => {
    const { isLogined, isUnlogined, logoutAction, user } = useUserStatuseStore();
    const {
        url,
        HOME_PATH,
        PROFILE_PATH,
        SIGN_IN_PATH,
    } = useRouterStore()

    const profileName = user.lastName.length|user.firstName.length 
        ? [ user.lastName, user.firstName ].join(' ') 
        : "Профиль";

    return (
        <Continer className="shadow flex justify-between items-center">
            <Link href={HOME_PATH}>
                <img className="object-none" src={QuarterLatinIcon} />
            </Link>
            
            <div className="inline-flex gap-2">
                { isLogined && <>
                    <Link href={PROFILE_PATH}>
                        <Button text={profileName} color="secondary" />
                    </Link>
                    <Button text="Выход" color="secondary" onClick={logoutAction}/> 
                </>}
                { isUnlogined && 
                    <Link href={SIGN_IN_PATH}>
                        <Button text="Войти" color="secondary" />
                    </Link>
                }
                {LANGS_VARIANT.map((lang)=>(
                    <Link key={lang} href={ changeLangInUrl(url,lang) }>
                        <button>{lang}</button>
                    </Link>
                ))}
            </div>
            
        </Continer>
    );
};