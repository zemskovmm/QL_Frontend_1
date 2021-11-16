import { InfinityList, ListItem, ListItemType } from "@project/components/src/ui-kit/List";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { useLocalesStore } from "stores/LocalesStore";
import { MY_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";
import { useApplicationsState } from "stores/ApplicationsState";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { IconLabel } from "@project/components/src/ui-kit/IconLabel";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Button } from "@project/components/src/ui-kit/Button";

export const LeftNavigation: FunctionalComponent<{ className?: string }> = memo(({ className }) => {
  const { url } = useRouterStore();
  const [isApplicationsOpen, setApplicationsOpen] = useState(false);
  const { PROFILE_PATH, SETTINGS_PATH } = useRouterStore();
  const {
    user: { email, firstName, lastName },
    logoutAction,
  } = useUserStatuseStore();

  const {
    lang,
    APPLICATION_TYTLES_LANG,
    PROFILE_LANG,
    MY_APPLICATIONS_LANG,
    NOTHING_HERE_YET,
    SETTINGS_LANG,
  } = useLocalesStore();

  const { applications, onItemRender, getApplications } = useApplicationsState();

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (MY_APPLICATIONS_TEMPLATE.isUrl(url)) {
      setApplicationsOpen(true);
    }
  }, [url]);

  const handleItemRender = (index: number): ListItemType | undefined => {
    onItemRender(index);
    const row = applications[index];
    if (row) {
      const { id, type } = row;
      const date: Date = new Date(); //TODO После добавления даты, получать с сервера
      return {
        id: MY_APPLICATIONS_TEMPLATE.getRoute({ lang, params:[id.toString()]}),
        text: (APPLICATION_TYTLES_LANG[type] || type.toString()).replace(":date", date.toLocaleDateString()),
      };
    }
  };

  return (
    <div className={` p-4 h-full flex flex-col ${className}`}>
      <IconLabel className="mt-5 mb-8" iconSrc={USER_ICON} text={`${lastName} ${firstName}`} subText={email} />
      <div className="flex flex-col">
        <ListItem text={PROFILE_LANG} onClick={() => route(PROFILE_PATH)} />
        <ListItem
          className="flex-shrink-0"
          text={MY_APPLICATIONS_LANG}
          onClick={() => setApplicationsOpen(!isApplicationsOpen)}
          isOpenArrow={isApplicationsOpen}
          withArrow
        />
        {isApplicationsOpen && (
          <InfinityList
            depth={1}
            className="max-h-32"
            count={applications.length}
            onClick={(id) => route(id)}
            onItemRender={handleItemRender}
          />
        )}
        {isApplicationsOpen && applications.length == 0 && <ListItem depth={1} text={NOTHING_HERE_YET} />}
        <ListItem text={SETTINGS_LANG} onClick={() => route(SETTINGS_PATH)} />
      </div>
      <Button className="self-end mt-auto mb-2.5 w-32" text="Выход" onClick={() => logoutAction} color={"red"} />
    </div>
  );
});
