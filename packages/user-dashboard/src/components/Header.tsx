import { FunctionalComponent } from "preact";
import { Container } from "components/Container";
import { Link, route } from "preact-router";
import { useRouterStore } from "stores/RouterStore";
import { Button } from "@project/components/src/ui-kit/Button";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import BURGER_ICON from "@project/components/src/assets/icons/burger.svg";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Logo } from "@project/components/src/ui-kit/Logo";
import { LangChooser } from "@project/components/src/ui-kit/LangChooser";
import { useLocalesStore } from "stores/LocalesStore";
import { Dropmenu } from "@project/components/src/ui-kit/Dropmenu";
import { LeftNavigation } from "./LeftNavigation";

export const Header: FunctionalComponent = () => {
  const { isLogined, isUnlogined, user } = useUserStatuseStore();
  const { langUrls, HOME_PATH, PROFILE_PATH, SIGN_IN_PATH } = useRouterStore();
  const { lang } = useLocalesStore();

  const profileName =
    user.lastName.length | user.firstName.length ? [user.lastName, user.firstName].join(" ") : "Профиль";

  return (
    <div className="px-2 shadow h-20 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-50">
      <Container className="flex justify-between items-center h-full">
        <Link href={HOME_PATH}>
          <Logo />
        </Link>

        <div className="relative inline-flex gap-5 items-center">
          <LangChooser
            lang={lang}
            urls={langUrls}
            linkComponent={({ url, lang }) => (
              <Link
                onClick={(e) => {
                  route(url);
                }}
                href={url}
              >
                {lang}
              </Link>
            )}
          />

          {isLogined ? (
            <>
              <Link href={PROFILE_PATH}>
                <Icon src={USER_ICON} alt={profileName} size="8" />
              </Link>
              <Dropmenu
                className="inline tablet:hidden"
                content={<Icon src={BURGER_ICON} alt="menu" size="8" />}
                position="rightScreen"
              >
                <LeftNavigation />
              </Dropmenu>
            </>
          ) : (
            <Link href={SIGN_IN_PATH}>
              <Button text="Войти" color="secondary" />
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};
