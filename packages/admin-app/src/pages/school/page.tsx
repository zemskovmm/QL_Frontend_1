import { AdminTable } from "../../components/common/AdminTable";
import { useRootStore } from "../../utils/rootStoreUtils";
import { AdminSchoolDto, AdminSchoolLanguageDto, SchoolPageStore } from "../../stores/pages/school/schoolPageStore";
import { observer, useObserver } from "mobx-react";
import { dmap } from "../../utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { FC } from "react";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";
import { IRemoteUiData, IRemoteUiEditorCustomization, RemoteUiEditor } from "@kekekeks/remoteui/src";
import {
  AdminLanguageDictionaryEditorStore,
  AdminRemoteUiLanguageDictionaryEditor,
} from "../../components/remoteui/AdminLanguageDictionaryEditor";

class SchoolEditorCustomization implements IRemoteUiEditorCustomization {
  getEditorFor(store: IRemoteUiData): any {
    if (store instanceof AdminLanguageDictionaryEditorStore)
      return <AdminRemoteUiLanguageDictionaryEditor store={store} />;
  }
}

const Column: FC<{ item: AdminSchoolLanguageDto<unknown>; id: string; l: string }> = ({ item, id, l }) =>
  item ? (
    <RouterLink routeName={RouteNames.schoolPage} params={{ id }}>
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

  const columns = schoolListPage.items;
  return useObserver(() => (
    <>
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
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

const customize = new SchoolEditorCustomization();

export const SchoolPage = () => {
  const { schoolPage } = useRootStore();

  return useObserver(() => (
    <>
      {schoolPage.remoteUiStore ? (
        <RemoteUiEditor store={schoolPage.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </>
  ));
};
