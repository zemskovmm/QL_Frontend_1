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
import { ComponentHostDashboardContext } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { useLocalized } from "src/locales";

type PropsType = {
  applicationType?: string;
  entityId?: string;
};

const ProfilePage: FC<PropsType> = ({ applicationType, entityId }) => {
  const cl = useContext(ComponentHostDashboardContext);
  const {lang,localizedText} = useLocalized()
  const { putUserAction, isLoading } = useProfileStore();
  const store = useUserStatuseStore();
  const {
    isRegistrationComplite,
    user: { firstName, lastName, phone, personalInfo },
  } = store;
  const { handleSubmit, control, setValue } = useForm<UserStatuseUserProps>();
  const { isLoading: isLoadingGS, personalCabinet } = useGlobalSettingsStore();
  cl!.personalInfo = personalInfo;

  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("phone", phone);
    setValue("personalInfo", cl?.personalInfo);
  }, [store]);

  // useEffect(() => {
  //   if (applicationType && isRegistrationComplite) {
  //     const createApplicationPath = CREATE_APPLICATIONS_TEMPLATE.getRoute({
  //       lang,
  //       params: [applicationType, entityId || "0"],
  //     });
  //     route(createApplicationPath);
  //   }
  // }, [isRegistrationComplite, applicationType, entityId]);

  return (
    <LeftNavigationLayout title={localizedText('PROFILE_LANG')}>
      <Preload isLoading={isLoading || isLoadingGS} color="white">
        <div className="flex flex-col pt-6 pb-3 px-4 md:py-8 md:pl-20 md:pr-12">
          <form className="flex flex-col" onSubmit={handleSubmit(putUserAction) as any}>
            <div className={`flex flex-col max-w-72`}>
              <InputControlled
                className="mb-3"
                name="firstName"
                label={localizedText('PROFILE_NAME')}
                placeholder={localizedText('PROFILE_PHONE_PLACEHOLDER')}
                control={control}
              />
              <InputControlled
                className="mb-3"
                name="lastName"
                label={localizedText('PROFILE_LASTNAME')}
                placeholder={localizedText('PROFILE_LASTNAME_PLACEHOLDER')}
                control={control}
              />
              <InputControlled
                name="phone"
                label={localizedText('PROFILE_PHONE')}
                placeholder={localizedText('PROFILE_PHONE_PLACEHOLDER')}
                control={control}
                type="tel"
              />
              {personalCabinet["profile"] && (
                <RowsPresenter rows={personalCabinet["profile"].form.pageData.rows ?? []} />
              )}
            </div>
            <Button
              className="mt-9 mb-2 ml-auto md:mt-2"
              text={localizedText('PROFILE_SAVE')}
              type="submit"
              disabled={isLoading}
              color={`red`}
            />
          </form>
        </div>
      </Preload>
    </LeftNavigationLayout>
  );
};

export default ProfilePage;
