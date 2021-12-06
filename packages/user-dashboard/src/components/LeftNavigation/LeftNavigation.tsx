import { InfinityList, ListItem } from "@project/components/src/ui-kit/List";
import { FC } from "react";
import { useEffect, memo } from "react";
import { useApplicationsState } from "src/stores/ApplicationsState";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";
import { IconLabel } from "@project/components/src/ui-kit/IconLabel";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Button } from "@project/components/src/ui-kit/Button";
import { Link, useNavigate } from "react-router-dom";
import { useLocalized } from "src/locales";
import { MY_APPLICATIONS_ROUTE, NEW_APPLICATION_ROUTE, PROFILE_ROUTE } from "src/constants";

export const LeftNavigation: FC<{ className?: string }> = memo(({ className }) => {
  const { lang, localizedText } = useLocalized();
  const {
    user: { email, firstName, lastName },
    logoutAction,
  } = useUserStatuseStore();
  const navigate = useNavigate();

  const { applicationList, onItemsRendered, setLang, isOpenList, setIsOpenList } = useApplicationsState();

  useEffect(() => {
    setLang(lang);
  }, [lang]);

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <IconLabel className="mt-5 mb-8" iconSrc={USER_ICON} text={`${lastName} ${firstName}`} subText={email} />
      <div className="w-full flex flex-col">
        <Link to={PROFILE_ROUTE}>
          <ListItem text={localizedText("PROFILE_LANG")} />
        </Link>
        <ListItem
          text={localizedText("MY_APPLICATIONS_LANG")}
          onClick={() => setIsOpenList(!isOpenList)}
          stopPropagation
          isOpenArrow={isOpenList}
          withArrow
        />
        {isOpenList && (
          <InfinityList
            depth={1}
            className="flex-shrink"
            provider={applicationList}
            onItemsRendered={onItemsRendered}
            onClick={(id) => navigate(MY_APPLICATIONS_ROUTE.replace(":applicationId", id))}
          />
        )}
        {isOpenList && applicationList.count == 0 && <ListItem depth={1} text={localizedText("NOTHING_HERE_YET")} />}
        {/* <Link to={SETTINGS_ROUTE}>
          <ListItem text={localizedText("SETTINGS_LANG")} />
        </Link> */}
        <div className={`mt-4 ml-auto md:hidden`}>
          <Link to={NEW_APPLICATION_ROUTE}>
            <Button plus={true} text={localizedText("NEW_APPLICATION_LANG")} color={"red"} />
          </Link>
        </div>
      </div>
      <Button className="self-end mt-auto mb-2.5 w-32 " text="Выход" onClick={logoutAction} color="red" />
    </div>
  );
});
