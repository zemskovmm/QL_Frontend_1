import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { RowsPresenter } from "@project/components/src/blocks";
import { Button } from "@project/components/src/ui-kit/Button";
import { useContext, useEffect } from "preact/hooks";
import { ComponentHostDashboardContext } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { useGlobalSettingsStore } from "stores/GlobalSettingsStore";
import {
  ApplicationPostProps,
  useApplicationStore,
} from "routes/MyApplicationsPage/_components/ApplicationTab/ApplicationStore";
import { useForm } from "react-hook-form";
import { Preload } from "@project/components/src/ui-kit/Preload";

type PropsType = {
  className?: string;
  applicationId: number;
};

export const ApplicationTab: FunctionalComponent<PropsType> = ({ className, applicationId }) => {
  const cl = useContext(ComponentHostDashboardContext);
  const store = useApplicationStore();
  const { PROFILE_SAVE } = useLocalesStore();
  const { application, postApplicationAction, isLoading: isLoadingStore } = store;
  const { isLoading: isLoadingGS, personalCabinet } = useGlobalSettingsStore();
  const { handleSubmit, control, setValue } = useForm<ApplicationPostProps>();

  useEffect(() => {
    store.getApplication(applicationId);
  }, [applicationId]);

  cl!.personalInfo = application.commonApplicationInfo;

  useEffect(() => {
    setValue("type", application.type);
    setValue("entityId", application.entityId);
    setValue("commonApplicationInfo", cl?.personalInfo ?? {});
    setValue("entityTypeSpecificApplicationInfo", {});
  }, [store]);

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
              text={PROFILE_SAVE}
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
