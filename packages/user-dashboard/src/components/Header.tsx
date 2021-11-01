import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { Container } from "components/Container";
import { Link, route } from "preact-router";
import { useRouterStore } from "stores/RouterStore";
import { Button } from "@project/components/src/ui-kit/Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { changeLangInUrl } from "locales/utils";
import BURGER_ICON from "@project/components/src/assets/icons/burger.svg";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { IconButton } from "@project/components/src/ui-kit/IconButton";
import { Logo } from "@project/components/src/ui-kit/Logo";
import { LangChooser } from "@project/components/src/ui-kit/LangChooser";
import { useLocalesStore } from "stores/LocalesStore";
import { Dropmenu } from "@project/components/src/ui-kit/Dropmenu";
import { LeftNavigation } from "./LeftNavigation";


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
        <div className="px-2 shadow h-20">
        <Container className="flex justify-between items-center h-full">
            <Link href={HOME_PATH}><Logo/></Link>

            <div className="relative inline-flex gap-2 items-center">
                <LangChooser lang={lang} onChoose={handleChoose}/>
                
                {isLogined ? (<>
                    <Link href={PROFILE_PATH}>
                        <Icon src={USER_ICON} alt={profileName} size="8"/>
                    </Link>
                    <Dropmenu 
                        className="inline tablet:hidden"
                        content={ <Icon src={BURGER_ICON} alt="menu" size="8"/>}
                        position="rightScreen"
                    >
                        <LeftNavigation/>
                    </Dropmenu>
                </>):(
                    <Link href={SIGN_IN_PATH}>
                        <Button text="Войти" color="secondary" />
                    </Link>
                )}
                
                
            </div>
        </Container>
        </div>
        
    );
};
