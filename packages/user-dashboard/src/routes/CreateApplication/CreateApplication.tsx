import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";
import { useLocalesStore } from "src/stores/LocalesStore";
import { useApplicationsState } from "src/stores/ApplicationsState";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { route } from "preact-router";
import {
  MY_APPLICATIONS_TEMPLATE,
  PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  useRouterStore,
} from "src/stores/RouterStore";
import { useEffect } from "react";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";

type PropsType = {
  applicationType: string;
  entityId: string;
};

export const CreateApplication: FC<PropsType> = ({ applicationType, entityId }) => {
  const { addApplication } = useApplicationsState();
  const { lang } = useLocalesStore();
  const { SIGN_IN_PATH, PROFILE_PATH } = useRouterStore();
  const { isUnlogined, isLogined, isRegistrationComplite } = useUserStatuseStore();

  const signInPath = applicationType
    ? SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
    : SIGN_IN_PATH;

  const profilePath = applicationType
    ? PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
    : PROFILE_PATH;

  useEffect(() => {
    if (isUnlogined) {
      route(signInPath, true);
    } else if (isRegistrationComplite) {
      handleAddApplication();
    } else if (isLogined) {
      route(profilePath, true);
    }
  }, [isUnlogined, isLogined, applicationType, entityId]);

  const handleAddApplication = async () => {
    if (Object.values(ApplicationType).includes(applicationType as ApplicationType)) {
      const id = await addApplication(applicationType as ApplicationType, Number(entityId));
      if (id) {
        route(MY_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [id.toString()] }), true);
      } else {
        route(MY_APPLICATIONS_TEMPLATE.getRoute({ lang, params: ["0"] }), true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Text className="m-4" text="Wait..." size="title-large" isBold />
    </div>
  );
};
