import { FunctionalComponent } from "preact";
import { Button } from "@project/components/src/ui-kit/Button";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "preact/hooks";
import { useProfileStore } from "./_store";
import { useUserStatuseStore, UserStatuseUserProps } from "stores/UserStatuseStore";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";
import { useGlobalSettingsStore } from "stores/GlobalSettingsStore";
import { RowsPresenter } from "@project/components/src/blocks";
import { Preload } from "@project/components/src/ui-kit/Preload";
import { ComponentHostDashboardContext } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { CREATE_APPLICATIONS_TEMPLATE } from "stores/RouterStore";
import { route } from "preact-router";

type PropsType = {
  applicationType?:string;
  entityId?:string;
}

const ProfilePage: FunctionalComponent<PropsType> = ({applicationType,entityId}) => {
  const cl = useContext(ComponentHostDashboardContext);
  const { PROFILE_LANG } = useLocalesStore();
  const { putUserAction, isLoading } = useProfileStore();
  const store = useUserStatuseStore();
  const {
    isRegistrationComplite,
    user: { firstName, lastName, phone, personalInfo },
  } = store;
  const { handleSubmit, control, setValue } = useForm<UserStatuseUserProps>();
  const { isLoading: isLoadingGS, personalCabinet } = useGlobalSettingsStore();
  const { lang } = useLocalesStore();
  cl!.personalInfo = personalInfo;


  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("phone", phone);
    setValue("personalInfo", cl?.personalInfo);
    
  }, [store]);

  useEffect(()=>{
    if(applicationType && isRegistrationComplite){
      const createApplicationPath = CREATE_APPLICATIONS_TEMPLATE.getRoute({lang,params:[applicationType,entityId||"0"]})
      route(createApplicationPath);
    }
  },[isRegistrationComplite,applicationType,entityId])

  return (
    <LeftNavigationLayout title={PROFILE_LANG}>
      <Preload isLoading={isLoading||isLoadingGS} color="white">
        <div className="flex flex-col p-4">
          <form className="flex flex-col max-w-72" onSubmit={handleSubmit(putUserAction) as any}>
            <InputControlled className="my-1" name="firstName" label="Имя" placeholder="Ваше имя" control={control} />
            <InputControlled
              className="my-1"
              name="lastName"
              label="Фамилия"
              placeholder="Ваше фамилия"
              control={control}
            />
            <InputControlled
              className="my-1"
              name="phone"
              label="Номер телефона"
              placeholder="Ваш номер"
              control={control}
              type="tel"
            />
            {personalCabinet["profile"] && <RowsPresenter rows={personalCabinet["profile"].form.pageData.rows ?? []} />}
            <Button className="my-2" text="Обновить" type="submit" disabled={isLoading} color={`red`} />
          </form>
        </div>
      </Preload>
    </LeftNavigationLayout>
  );
};

export default ProfilePage;
