import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "../AdminRoutes";
import { AdminButton } from "../../../components/common/AdminButton";
import { useObserver } from "mobx-react";

export const HousingTablePage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <RouterLink routeName={AdminRouteNames.housingCreate}>
          <AdminButton color={"primary"}>Create housing</AdminButton>
        </RouterLink>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {/*<AdminTable<AdminSchoolDto<unknown>>*/}
          {/*  columns={dmap(AllLanguages, (l) => ({*/}
          {/*    id: l,*/}
          {/*    header: l,*/}
          {/*    renderer: (row) => <Column item={row.languages[l]} id={row.id} l={l} />,*/}
          {/*  }))}*/}
          {/*  rows={courseListPage.items}*/}
          {/*  idGetter={(r) => r.id}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
};

export const HousingEditPage = () => {
  // const { courseEdit } = useRootStore();

  return useObserver(() => (
    <div>
      {/*<div className={`flex m-2 items-center`}>*/}
      {/*  <AdminButton color={"primary"} className={`mr-4`} onClick={() => courseEdit.save()}>*/}
      {/*    Save*/}
      {/*  </AdminButton>*/}
      {/*  <RouterLink routeName={AdminRouteNames.courseTraitEditor} params={{ id: `${courseEdit.id}` }}>*/}
      {/*    <AdminButton color={"primary"} className={`mr-4`}>*/}
      {/*      {" "}*/}
      {/*      Traits editor{" "}*/}
      {/*    </AdminButton>*/}
      {/*  </RouterLink>*/}
      {/*  <div>Course id: {courseEdit.id}</div>*/}
      {/*</div>*/}
      {/*{courseEdit.remoteUiStore ? (*/}
      {/*  <RemoteUiEditor store={courseEdit.remoteUiStore} customization={customize} />*/}
      {/*) : (*/}
      {/*  <>loading...</>*/}
      {/*)}*/}
    </div>
  ));
};

export const HousingCreatePage = () => {
  // const { courseCreate } = useRootStore();

  return useObserver(() => (
    <div>
      <div className={`m-2`}>
        {/*<AdminButton color={"primary"} onClick={() => courseCreate.save()}>*/}
        {/*  Save*/}
        {/*</AdminButton>*/}
      </div>
      {/*{courseCreate.remoteUiStore ? (*/}
      {/*  <RemoteUiEditor store={courseCreate.remoteUiStore} customization={customize} />*/}
      {/*) : (*/}
      {/*  <>loading...</>*/}
      {/*)}*/}
    </div>
  ));
};

export const HousingTraitEditPage = () => {
  // const { courseTraitEditor } = useRootStore();
  // return useObserver(() => <TraitEditor store={courseTraitEditor.traitStore} />);
  return <></>;
};

export const HousingAccommodationEdit = () => {
  return <>Accomodation edit</>;
};

export const HousingAccommodationTraitEdit = () => {
  // const { courseTraitEditor } = useRootStore();
  // return useObserver(() => <TraitEditor store={courseTraitEditor.traitStore} />);
  return <>Accomodation trait edit</>;
};
