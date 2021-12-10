import { FC } from "react";
import { Button } from "@project/components/src/ui-kit/Button";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { useProfileStore } from "./_store";
import { useUserStatuseStore, UserStatuseUserProps } from "src/stores/UserStatuseStore";
import { LeftNavigationLayout } from "src/layouts/LeftNavigationLayout";
import { useGlobalSettingsStore } from "src/stores/GlobalSettingsStore";
import { RowsPresenter } from "@project/components/src/blocks";
import { Preload } from "@project/components/src/ui-kit/Preload";
import { useFormBuilderContext } from "@project/components/src/FormBuilderBlocks/FormBuilderProvider";
import { useLocalized } from "src/locales";
import { useNavigate } from "react-router-dom";
import { CREATE_COMPLITE_APPLICATIONS_ROUTE } from "src/constants";
import { useNewApplicationState } from "src/stores/ApplicationsState";
import { portalUserFileApi } from "src/api/PortalUserFileApi";

const ProfilePage: FC = () => {
  const { info, setInfo, clear, setMediaStore } = useFormBuilderContext();
  const { lang, localizedText } = useLocalized();
  const { putUserAction, isLoading } = useProfileStore();
  const { isRegistrationComplite, user } = useUserStatuseStore();
  const { handleSubmit, control, setValue } = useForm<UserStatuseUserProps>();
  const { isLoading: isLoadingGS, personalCabinet } = useGlobalSettingsStore();
  const navigate = useNavigate();
  const { createApplicationReq } = useNewApplicationState();

  useEffect(() => {
    setMediaStore({
      postMedia: async (data: FormData) => {
        const { isOk, error, body } = await portalUserFileApi.postUserFile(data);
        if (isOk) {
          return body?.id || 0;
        }
        throw error;
      },
      deleteMedia: async (id: number) => {
        const { isOk, error, body } = await portalUserFileApi.deleteUserFile(id);
        if (!isOk) {
          throw error;
        }
      },
    });
    return clear;
  }, []);

  useEffect(() => {
    setInfo(user.personalInfo);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("phone", user.phone);
  }, [user]);

  useEffect(() => {
    if (createApplicationReq && isRegistrationComplite) {
      navigate(CREATE_COMPLITE_APPLICATIONS_ROUTE);
    }
  }, [isRegistrationComplite, createApplicationReq]);

  const handleSubmitForm = (data: UserStatuseUserProps) => {
    putUserAction({ ...data, personalInfo: info });
  };

  return (
    <LeftNavigationLayout title={localizedText("PROFILE_LANG")}>
      <Preload
        className="flex flex-col h-full pt-6 pb-3 px-4 md:py-8 md:pl-20 md:pr-12"
        isLoading={isLoading || isLoadingGS}
        color="white"
      >
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit(handleSubmitForm) as any}>
          <div className={`flex flex-col max-w-72`}>
            <InputControlled
              className="mb-3"
              name="firstName"
              label={localizedText("PROFILE_NAME")}
              placeholder={localizedText("PROFILE_PHONE_PLACEHOLDER")}
              control={control}
            />
            <InputControlled
              className="mb-3"
              name="lastName"
              label={localizedText("PROFILE_LASTNAME")}
              placeholder={localizedText("PROFILE_LASTNAME_PLACEHOLDER")}
              control={control}
            />
            <InputControlled
              name="phone"
              label={localizedText("PROFILE_PHONE")}
              placeholder={localizedText("PROFILE_PHONE_PLACEHOLDER")}
              control={control}
              type="tel"
            />
            {personalCabinet["profile"] && <RowsPresenter rows={personalCabinet["profile"].form.pageData.rows ?? []} />}
          </div>
          <Button
            className="mt-9 mb-2 ml-auto md:mt-2"
            text={localizedText("PROFILE_SAVE")}
            type="submit"
            disabled={isLoading}
            color={`red`}
          />
        </form>
      </Preload>
    </LeftNavigationLayout>
  );
};

export default ProfilePage;
