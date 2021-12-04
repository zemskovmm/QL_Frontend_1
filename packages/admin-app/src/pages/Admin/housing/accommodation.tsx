import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "../AdminRoutes";
import { AdminButton } from "../../../components/common/AdminButton";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { TraitEditor } from "../../../components/traitEditor";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminTable } from "../../../components/common/AdminTable";
import { AllLanguages } from "@project/components/src/utils/langs";
import { dmap } from "../../../utils/util";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { FC } from "react";
import {
  AdminHousingAccommodationDto,
  AdminHousingAccommodationLanguageDto,
} from "../../../stores/pages/housing/housing-accommodation-page-store";

const customize = new AdminLanguageDictionaryEditorCustomization();

const Column: FC<{ item: AdminHousingAccommodationLanguageDto<unknown>; id: string; l: string; housingId: string }> = ({
  item,
  id,
  housingId,
}) =>
  item ? (
    <RouterLink routeName={AdminRouteNames.housingAccommodationEdit} params={{ id, housingId }}>
      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
        {item}
        <br />
        <sup>{item}</sup>
      </a>
    </RouterLink>
  ) : (
    <>...</>
  );

export const HousingAccommodationTablePage = () => {
  const { housingAccommodationListPage } = useRootStore();
  const id = `${housingAccommodationListPage.id}`;
  const housingId = `${housingAccommodationListPage.housingId}`;
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <RouterLink routeName={AdminRouteNames.housingAccommodationCreate} params={{ id, housingId }}>
          <AdminButton color={"primary"}>Create accommodation</AdminButton>
        </RouterLink>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <AdminTable<AdminHousingAccommodationDto<unknown>>
            columns={dmap(AllLanguages, (l) => ({
              id: l,
              header: l,
              renderer: (row) => <Column housingId={`${row.housingId}`} item={row.names[l]} id={`${row.id}`} l={l} />,
            }))}
            rows={housingAccommodationListPage.items}
            idGetter={(r) => `${r.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export const HousingAccommodationEdit = () => {
  const { housingAccommodationEdit } = useRootStore();
  const id = `${housingAccommodationEdit.id}`;
  const housingId = `${housingAccommodationEdit.housingId}`;

  return useObserver(() => (
    <div>
      <div className={`flex m-2 items-center`}>
        <AdminButton color={"primary"} className={`mr-4`} onClick={() => housingAccommodationEdit.save()}>
          Save
        </AdminButton>
        <RouterLink routeName={AdminRouteNames.housingAccommodationTraitEdit} params={{ id, housingId }}>
          <AdminButton color={"primary"} className={`mr-4`}>
            {" "}
            Traits editor{" "}
          </AdminButton>
        </RouterLink>
        <div>Housing id: {id}</div>
      </div>
      {housingAccommodationEdit.remoteUiStore ? (
        <RemoteUiEditor store={housingAccommodationEdit.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const HousingAccommodationCreatePage = () => {
  const { housingAccommodationCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`m-2`}>
        <AdminButton color={"primary"} onClick={() => housingAccommodationCreate.save()}>
          Save
        </AdminButton>
      </div>
      {housingAccommodationCreate.remoteUiStore ? (
        <RemoteUiEditor store={housingAccommodationCreate.remoteUiStore} customization={customize} />
      ) : (
        <>loading...</>
      )}
    </div>
  ));
};

export const HousingAccommodationTraitEdit = () => {
  const { housingAccommodationTraitEditor } = useRootStore();
  return useObserver(() => <TraitEditor store={housingAccommodationTraitEditor.traitStore} />);
};
