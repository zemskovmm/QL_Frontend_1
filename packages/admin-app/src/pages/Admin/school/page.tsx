import { AdminTable } from "src/components/common/AdminTable";
import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminSchoolDto, AdminSchoolLanguageDto } from "src/stores/pages/school/schoolPageStore";
import { useObserver } from "mobx-react";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { FC } from "react";
import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { IRemoteUiData, IRemoteUiEditorCustomization, RemoteUiEditor } from "@kekekeks/remoteui/src";
import {
  AdminLanguageDictionaryEditorStore,
  AdminRemoteUiLanguageDictionaryEditor,
} from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { AdminButton } from "src/components/common/AdminButton";
import { TraitEditor } from "src/components/traitEditor";

export class AdminLanguageDictionaryEditorCustomization implements IRemoteUiEditorCustomization {
  getEditorFor(store: IRemoteUiData): any {
    if (store instanceof AdminLanguageDictionaryEditorStore)
      return <AdminRemoteUiLanguageDictionaryEditor store={store} />;
  }
}

const Column: FC<{ item: AdminSchoolLanguageDto<unknown>; id: string; l: string }> = ({ item, id }) =>
  item ? (
    <RouterLink routeName={AdminRouteNames.schoolPage} params={{ id }}>
      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
        {item.name}
        <br />
        <sup>{item.url}</sup>
      </a>
    </RouterLink>
  ) : (
    <>...</>
  );

export const SchoolListPage = () => {
  const { schoolListPage } = useRootStore();

  return useObserver(() => (
    <>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <RouterLink routeName={AdminRouteNames.schoolCreate}>
            <AdminButton color={"primary"}>Create school</AdminButton>
          </RouterLink>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <AdminTable<AdminSchoolDto<unknown>>
              columns={dmap(AllLanguages, (l) => ({
                id: l,
                header: l,
                renderer: (row) => <Column item={row.languages[l]} id={row.id} l={l} />,
              }))}
              rows={schoolListPage.items}
              idGetter={(r) => r.id}
            />
          </div>
        </div>
      </div>
    </>
  ));
};

const customize = new AdminLanguageDictionaryEditorCustomization();

export const SchoolPage = () => {
  const { schoolPage } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`flex m-2 items-center`}>
        <AdminButton color={"primary"} className={`mr-4`} onClick={() => schoolPage.save()}>
          Save
        </AdminButton>
        <RouterLink
          routeName={AdminRouteNames.schoolTraitEditor}
          className={`mr-4`}
          params={{ id: `${schoolPage.id}` }}
        >
          <AdminButton color={"primary"}> Traits editor </AdminButton>
        </RouterLink>
        <div>School Id: {schoolPage.id}</div>
      </div>
      {schoolPage.remoteUiStore ? (
        <RemoteUiEditor store={schoolPage.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const CreateSchoolPage = () => {
  const { schoolPageCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <AdminButton color={"primary"} onClick={() => schoolPageCreate.save()}>
        Save
      </AdminButton>
      {schoolPageCreate.remoteUiStore ? (
        <RemoteUiEditor store={schoolPageCreate.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const SchoolTraitEditorPage = () => {
  const { schoolTraitEditor } = useRootStore();
  return <TraitEditor store={schoolTraitEditor.traitStore} />;
};