import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "../AdminRoutes";
import { AdminButton } from "../../../components/common/AdminButton";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { TraitEditor } from "../../../components/traitEditor";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminHousingDto, AdminHousingLanguageDto } from "../../../stores/pages/housing/housing-page-store";
import { AdminTable } from "../../../components/common/AdminTable";
import { AllLanguages } from "@project/components/src/utils/langs";
import { dmap } from "../../../utils/util";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { FC } from "react";

const customize = new AdminLanguageDictionaryEditorCustomization();

const Column: FC<{ item: AdminHousingLanguageDto<unknown>; id: string; l: string }> = ({ item, id }) =>
  item ? (
    <RouterLink routeName={AdminRouteNames.housingEdit} params={{ id }}>
      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
        {item.name}
        <br />
        <sup>{item.name}</sup>
      </a>
    </RouterLink>
  ) : (
    <>...</>
  );

export const HousingTablePage = () => {
  const { housingListPage } = useRootStore();

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <RouterLink routeName={AdminRouteNames.housingCreate}>
          <AdminButton color={"primary"}>Create housing</AdminButton>
        </RouterLink>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <AdminTable<AdminHousingDto<unknown>>
            columns={dmap(AllLanguages, (l) => ({
              id: l,
              header: l,
              renderer: (row) => <Column item={row.languages[l]} id={row.id} l={l} />,
            }))}
            rows={housingListPage.items}
            idGetter={(r) => r.id}
          />
        </div>
      </div>
    </div>
  );
};

export const HousingEditPage = () => {
  const { housingEdit } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`flex m-2 items-center`}>
        <AdminButton color={"primary"} className={`mr-4`} onClick={() => housingEdit.save()}>
          Save
        </AdminButton>
        <RouterLink routeName={AdminRouteNames.housingTraitEdit} params={{ id: `${housingEdit.id}` }}>
          <AdminButton color={"primary"} className={`mr-4`}>
            {" "}
            Traits editor{" "}
          </AdminButton>
        </RouterLink>
        <RouterLink routeName={AdminRouteNames.housingAccommodationList} params={{ id: `${housingEdit.id}` }}>
          <AdminButton color={"primary"} className={`mr-4`}>
            {" "}
            Accommodations{" "}
          </AdminButton>
        </RouterLink>
        <div>Housing id: {housingEdit.id}</div>
      </div>
      {housingEdit.remoteUiStore ? (
        <RemoteUiEditor store={housingEdit.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const HousingCreatePage = () => {
  const { housingCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`m-2`}>
        <AdminButton color={"primary"} onClick={() => housingCreate.save()}>
          Save
        </AdminButton>
      </div>
      {housingCreate.remoteUiStore ? (
        <RemoteUiEditor store={housingCreate.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const HousingTraitEditPage = () => {
  const { housingTraitEditor } = useRootStore();
  return useObserver(() => <TraitEditor store={housingTraitEditor.traitStore} />);
};
