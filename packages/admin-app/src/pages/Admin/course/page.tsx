import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminButton } from "src/components/common/AdminButton";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { AdminTable } from "src/components/common/AdminTable";
import { AdminSchoolDto } from "src/stores/pages/school/schoolPageStore";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { FC } from "react";
import { AdminCourseLanguageDto } from "src/stores/pages/course/coursePageStore";
import { TraitEditor } from "src/components/traitEditor";

const customize = new AdminLanguageDictionaryEditorCustomization();

export const CourseCreatePage = () => {
  const { courseCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`m-2`}>
        <AdminButton color={"primary"} onClick={() => courseCreate.save()}>
          Save
        </AdminButton>
      </div>
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
      <div className={`flex m-2 items-center`}>
        <AdminButton color={"primary"} className={`mr-4`} onClick={() => courseEdit.save()}>
          Save
        </AdminButton>
        <RouterLink routeName={AdminRouteNames.courseTraitEditor} params={{ id: `${courseEdit.id}` }}>
          <AdminButton color={"primary"} className={`mr-4`}>
            {" "}
            Traits editor{" "}
          </AdminButton>
        </RouterLink>
        <div>Course id: {courseEdit.id}</div>
      </div>
      {courseEdit.remoteUiStore ? (
        <RemoteUiEditor store={courseEdit.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

const Column: FC<{ item: AdminCourseLanguageDto<unknown>; id: string; l: string }> = ({ item, id }) =>
  item ? (
    <RouterLink routeName={AdminRouteNames.coursePage} params={{ id }}>
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
          <RouterLink routeName={AdminRouteNames.courseCreate}>
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
