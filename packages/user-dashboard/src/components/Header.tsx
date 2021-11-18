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
import { MenuBurger } from "components/MenuBurger";

export const Header: FunctionalComponent = () => {
  const { isLogined, user } = useUserStatuseStore();
  const { langUrls, PROFILE_PATH, SIGN_IN_PATH } = useRouterStore();
  const { lang } = useLocalesStore();

  const profileName =
    user.lastName.length | user.firstName.length ? [user.lastName, user.firstName].join(" ") : "Профиль";

  return (
    <div className="px-2 shadow h-20 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-50">
      <Container className="flex justify-between items-center h-full">
      <Logo />

        <div className="relative inline-flex gap-5 items-center">
          <LangChooser
            lang={lang}
            urls={langUrls}
            linkComponent={({ url, lang }) => (
              <Link
                onClick={() => {
                  route(url);
                }}
                href={url}
              >
                {lang}
              </Link>
            )}
          />

          {isLogined && <>
              <Link href={PROFILE_PATH}>
                <Icon src={USER_ICON} alt={profileName} size="8" />
              </Link>
              <MenuBurger className="inline tablet:hidden" />
          </>}
        </div>
      </Container>
    </div>
  );
};
