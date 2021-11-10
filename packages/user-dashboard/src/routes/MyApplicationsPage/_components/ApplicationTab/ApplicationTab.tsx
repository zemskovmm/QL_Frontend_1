import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";
import { useLocalesStore } from "stores/LocalesStore";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { RowsPresenter } from "@project/components/src/blocks";
import { Button } from "@project/components/src/ui-kit/Button";

type PropsType = {
  className?: string;
  applicationId: number;
};

export const ApplicationTab: FunctionalComponent<PropsType> = ({ className, applicationId }) => {
  const { APPLICATION_LANG } = useLocalesStore();

  const classes = ["flex flex-col border gap-2 p-2", className ? className : ""].join(" ");

  return (
    <div className={classes}>
      <Text text={APPLICATION_LANG} size="title-medium" />
      {/*<form className="flex flex-col max-w-72" onSubmit={handleSubmit(putUserAction) as any}>*/}
      {/*  {gs && <RowsPresenter rows={gs?.personalCabinet["profile"].form.pageData.rows ?? []} />}*/}
      {/*  <Button className="my-2" text="Обновить" type="submit" disabled={isLoading} />*/}
      {/*</form>*/}
    </div>
  );
};
