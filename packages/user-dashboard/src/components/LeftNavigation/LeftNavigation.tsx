import { InfinityList, ListItem, ListItemType } from "@project/components/src/ui-kit/List";
import { FC } from "react";
import { useEffect, useState, memo } from "react";
import { useApplicationsState } from "src/stores/ApplicationsState";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";
import { IconLabel } from "@project/components/src/ui-kit/IconLabel";
import USER_ICON from "@project/components/src/assets/icons/user.svg";
import { Button } from "@project/components/src/ui-kit/Button";
import { Link,useNavigate } from "react-router-dom";
import { useLocalized } from "src/locales";
import { MY_APPLICATIONS_ROUTE, NEW_APPLICATION_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "src/constants";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";

export const LeftNavigation: FC<{ className?: string }> = memo(({ className }) => {
  const [ isApplicationsListOpen, setApplicationsListOpen ] = useState(false);
  const { localizedText } = useLocalized()
  const {
    user: { email, firstName, lastName },
    logoutAction,
  } = useUserStatuseStore();
  const navigate = useNavigate();
 
  const { applications, onItemRender, getApplications,isOpenPage} = useApplicationsState();

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (isOpenPage) {
      setApplicationsListOpen(true);
    }
  }, [isOpenPage]);

  const APPLICATION_TYTLES_LANG:{[key:string]:string} = {
    [ApplicationType.Course]:localizedText("APPLICATION_TYTLES_COURSE_LANG"),
    [ApplicationType.Housing]:localizedText("APPLICATION_TYTLES_HOUSING_LANG"),
    [ApplicationType.University]:localizedText("APPLICATION_TYTLES_UNIVERSITY_LANG"),
    [ApplicationType.Visa]:localizedText("APPLICATION_TYTLES_VISA_LANG"),
  }

  const handleItemRender = (index: number): ListItemType | undefined => {
    onItemRender(index);
    const row = applications[index];
    if (row) {
      const { id, type } = row;
      const date: Date = new Date(); //TODO После добавления даты, получать с сервера
      return {
        id: MY_APPLICATIONS_ROUTE.replace(':applicationId',id.toString()),
        text: (APPLICATION_TYTLES_LANG[type] || type.toString()).replace(":date", date.toLocaleDateString()),
      };
    }
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <IconLabel className="mt-5 mb-8" iconSrc={USER_ICON} text={`${lastName} ${firstName}`} subText={email} />
      <div className="w-full flex flex-col">
        <Link to={PROFILE_ROUTE}>
          <ListItem text={localizedText("PROFILE_LANG")} />
        </Link>
        <ListItem
          text={localizedText("MY_APPLICATIONS_LANG")}
          onClick={() => setApplicationsListOpen(!isApplicationsListOpen)}
          stopPropagation
          isOpenArrow={isApplicationsListOpen}
          withArrow
        />
        {isApplicationsListOpen && (
          <InfinityList
            depth={1}
            className="flex-shrink"
            count={applications.length}
            onClick={navigate}
            onItemRender={handleItemRender}
          />
        )}
        {isApplicationsListOpen && applications.length == 0 && 
          <ListItem depth={1} text={localizedText("NOTHING_HERE_YET")} />
        }
        <Link to={SETTINGS_ROUTE}>
          <ListItem text={localizedText("SETTINGS_LANG")} />
        </Link>
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
