import { FunctionalComponent } from "preact";
import { Container } from "components/Container";
import { Link, route } from "preact-router";
import { useRouterStore } from "stores/RouterStore";
import { Button } from "@project/components/src/ui-kit/Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Logo } from "@project/components/src/ui-kit/Logo";
import { LangChooser } from "@project/components/src/ui-kit/LangChooser";
import { useLocalesStore } from "stores/LocalesStore";
import { MenuBurger } from "./MenuBurger";


export const Header: FunctionalComponent = () => {
    const { isLogined, isUnlogined, user } = useUserStatuseStore();
    const { langUrls, HOME_PATH, PROFILE_PATH, SIGN_IN_PATH } = useRouterStore();
    const { lang } = useLocalesStore()
    
    const profileName =
        user.lastName.length | user.firstName.length ? [user.lastName, user.firstName].join(" ") : "Профиль";

    return (
        <div className="px-3.5 shadow h-14 tablet:h-20">
            <Container className="flex justify-between items-center h-full">
                <Link href={HOME_PATH}><Logo/></Link>

                <div className="relative inline-flex gap-5 items-center">
                    <LangChooser 
                        lang={lang} 
                        urls={langUrls}
                        linkComponent={({url,lang})=><Link onClick={(e)=>{route(url)}} href={url}>{lang}</Link>}/>
                    
                    {isLogined ? (<>
                        <Link href={PROFILE_PATH}>
                            <Icon src={USER_ICON} alt={profileName} size="8"/>
                        </Link>
                        <MenuBurger className="inline tablet:hidden"/>
                    </>):(
                        <Link href={SIGN_IN_PATH}>
                            <Button className="px-4" text="Войти" size="default-mobile"/>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
        
    );
};
