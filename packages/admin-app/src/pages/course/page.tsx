import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminButton } from "../../components/common/AdminButton";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";
import { AdminTable } from "../../components/common/AdminTable";
import { AdminSchoolDto, AdminSchoolLanguageDto } from "../../stores/pages/school/schoolPageStore";
import { dmap } from "../../utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { FC } from "react";
import { AdminCourseDto, AdminCourseLanguageDto } from "../../stores/pages/course/coursePageStore";
import { TraitEditor } from "../../components/traitEditor";

const customize = new AdminLanguageDictionaryEditorCustomization();

export const CourseCreatePage = () => {
  const { courseCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <AdminButton color={"primary"} onClick={() => courseCreate.save()}>
        Save
      </AdminButton>
      {courseCreate.remoteUiStore ? (
        <RemoteUiEditor store={courseCreate.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const CourseEditPage = () => {
  const { courseEdit } = useRootStore();

  return useObserver(() => (
    <div>
      <AdminButton color={"primary"} onClick={() => courseEdit.save()}>
        Save
      </AdminButton>
      {courseEdit.remoteUiStore ? (
        <RemoteUiEditor store={courseEdit.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

const Column: FC<{ item: AdminCourseLanguageDto<unknown>; id: string; l: string }> = ({ item, id, l }) =>
  item ? (
    <RouterLink routeName={RouteNames.coursePage} params={{ id }}>
      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
        {item.name}
        <br />
        <sup>{item.name}</sup>
      </a>
    </RouterLink>
  ) : (
    <>...</>
  );

export const CourseListPage = () => {
  const { courseListPage } = useRootStore();

  return useObserver(() => (
    <>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <RouterLink routeName={RouteNames.courseCreate}>
            <AdminButton color={"primary"}>Create course</AdminButton>
          </RouterLink>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <AdminTable<AdminSchoolDto<unknown>>
              columns={dmap(AllLanguages, (l) => ({
                id: l,
                header: l,
                renderer: (row) => <Column item={row.languages[l]} id={row.id} l={l} />,
              }))}
              rows={courseListPage.items}
              idGetter={(r) => r.id}
            />
          </div>
        </div>
      </div>
    </>
  ));
};

export const CourseTraitEditorPage = () => {
  const { courseTraitEditor } = useRootStore();
  return useObserver(() => <TraitEditor store={courseTraitEditor.traitStore} />);
};
