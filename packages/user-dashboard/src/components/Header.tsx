import { FunctionalComponent } from "preact";
import QuarterLatinIcon from "assets/quarter-latin.png";
import { Container } from "components/Container";
import { Link, route } from "preact-router";
import { useRouterStore } from "stores/RouterStore";
import { Button } from "@project/components/src/ui-kit/Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { changeLangInUrl, LANGS_VARIANT } from "locales/utils";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { LangChooser } from "@project/components/src/ui-kit/LangChooser";
import { useLocalesStore } from "stores/LocalesStore";

export const Header: FunctionalComponent = () => {
    const { isLogined, isUnlogined, user } = useUserStatuseStore();
    const { url, HOME_PATH, PROFILE_PATH, SIGN_IN_PATH } = useRouterStore();
    const { lang } = useLocalesStore()

    const profileName =
        user.lastName.length | user.firstName.length ? [user.lastName, user.firstName].join(" ") : "Профиль";

    const handleChoose = (newLang:string)=>{
        route(changeLangInUrl(url, newLang))
    }

    return (
        <div className="px-2 shadow">
        <Container className="flex justify-between items-center">
            <Link href={HOME_PATH}>
                <img className="object-none" src={QuarterLatinIcon} />
            </Link>

            <div className="inline-flex gap-2 items-center">
                <LangChooser lang={lang} onChoose={handleChoose}/>
                
                {isUnlogined && (
                    <Link href={SIGN_IN_PATH}>
                    <Button text="Войти" color="secondary" />
                    </Link>
                )}
                {isLogined && (
                    <Link href={PROFILE_PATH}>
                    <Icon src={USER_ICON} alt={profileName} size="8"/>
                    </Link>
                )}
            </div>
        </Container>
        </div>
        
    );
};
