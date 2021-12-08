import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";
import { RowsPresenter } from "@project/components/src/blocks";
import { Button } from "@project/components/src/ui-kit/Button";
import { useContext, useEffect } from "react";
import { ComponentHostDashboardContext } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { useGlobalSettingsStore } from "src/stores/GlobalSettingsStore";
import { useApplicationTabStore } from "./ApplicationTabStore";
import { useForm } from "react-hook-form";
import { Preload } from "@project/components/src/ui-kit/Preload";
import { ApplicationPostProps } from "@project/components/src/interfaces/ApplicationDto";
import { useLocalized } from "src/locales";

type PropsType = {
  className?: string;
  applicationId: number;
};

export const ApplicationTab: FC<PropsType> = ({ className, applicationId }) => {
  const cl = useContext(ComponentHostDashboardContext);
  const { application, postApplicationAction, isLoading: isLoadingStore, getApplication } = useApplicationTabStore();
  const { localizedText } = useLocalized();
  const { isLoading: isLoadingGS, personalCabinet } = useGlobalSettingsStore();
  const { handleSubmit, control, setValue } = useForm<ApplicationPostProps>();

  useEffect(() => {
    getApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    cl!.personalInfo = application.commonApplicationInfo;
  }, [application]);

  useEffect(() => {
    setValue("type", application.type);
    setValue("entityId", application.entityId);
    setValue("commonApplicationInfo", cl?.personalInfo ?? {});
    setValue("entityTypeSpecificApplicationInfo", {});
  }, [application]);

  const classes = ["flex flex-col gap-2", className ? className : ""].join(" ");

  return (
    <div className={classes}>
      <Preload isLoading={isLoadingStore || isLoadingGS} color="white" className={`flex flex-col h-full`}>
        {/*<Text text={APPLICATION_LANG} size="title-medium" />*/}
        {personalCabinet[application.type.toString().toLowerCase()] ? (
          <form className="flex flex-col mx-0 h-full" onSubmit={handleSubmit(postApplicationAction) as any}>
            <div className={`mb-3`}>
              <RowsPresenter
                marginAuto={true}
                rows={personalCabinet[application.type.toString().toLowerCase()].form.pageData.rows ?? []}
              />
            </div>
            <Button
              className="ml-auto mt-auto"
              text={localizedText("PROFILE_SAVE")}
              type="submit"
              disabled={isLoadingStore}
              color="red"
            />
          </form>
        ) : (
          "Form is not allowed"
        )}
      </Preload>
    </div>
  );
};
