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
import cn from "classnames";

type PropsType = {
  className?: string;
};

export const Header: FC<PropsType> = ({ className }) => {
  const { isAuthorized, user } = useUserStatuseStore();
  const { lang, setLang, localizedText } = useLocalized();

  const profileName =
    user.lastName.length | user.firstName.length
      ? [user.lastName, user.firstName].join(" ")
      : localizedText("PROFILE_LANG");

  return (
    <div className={cn("relative h-14 md:h-20", className)}>
      <div className="fixed bg-white shadow left-0 top-0 h-14 md:h-20 py-2.5 md:py-1 w-full z-10">
        <Container className="flex justify-between items-center h-full">
          <Logo />
          <div className="inline-flex gap-5 items-center">
            <LangChooser
              lang={lang}
              linkComponent={(showLang: string) => (
                <a
                  onClick={() => {
                    setLang(showLang);
                  }}
                >
                  {showLang}
                </a>
              )}
            />

            {isAuthorized && (
              <>
                <Link to={PROFILE_ROUTE}>
                  <Icon src={USER_ICON} alt={profileName} size="8" />
                </Link>
                <MenuBurger className="inline md:hidden" />
              </>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
