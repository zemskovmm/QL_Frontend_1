import { FC } from "react";
import { Container } from "./Container";
import { useUserStatuseStore } from "../stores/UserStatuseStore";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Logo } from "@project/components/src/ui-kit/Logo";
import { LangChooser } from "@project/components/src/ui-kit/LangChooser";
import { MenuBurger } from "./MenuBurger";
import { Link } from "react-router-dom";
import { useLocalized } from "src/locales";
import { PROFILE_ROUTE } from "src/constants";

export const Header: FC = () => {
  const { isLogined, user } = useUserStatuseStore();
  const { lang,setLang} = useLocalized();

  const profileName =
    user.lastName.length | user.firstName.length ? [user.lastName, user.firstName].join(" ") : "Профиль";

  return (
    <div className="mb-10 md:mb-0 px-3 md:px-10 py-2.5 md:py-1 box-content shadow md:h-20 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-50">
      <Container className="flex justify-between items-center h-full">
        <Logo />
        <div className="relative inline-flex gap-5 items-center">
          <LangChooser
            lang={lang}
            linkComponent={(showLang:string) => (
              <a onClick={() => {setLang(showLang)}}>
                {showLang}
              </a>
            )}
          />

          {isLogined && (
            <>
              <Link to={PROFILE_ROUTE}>
                <Icon src={USER_ICON} alt={profileName} size="8" />
              </Link>
              <MenuBurger className="inline tablet:hidden" />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
