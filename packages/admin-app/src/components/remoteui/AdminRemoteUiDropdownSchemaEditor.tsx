import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";
import { RootStore } from "../../stores/RootStore";
import { useRootStore } from "../../utils/rootStoreUtils";
import { FormSchemaFieldDto } from "../../interfaces/GlobalSettingsDto";

export class AdminRemoteUiDropdownSchemaEditorStore implements IRemoteUiData {
  @observable isValid = true;
  @observable value?: string;
  @observable items: AdminRemoteUiDropdownSchemaEditorPropsItem[];
  @observable id: number | string;
  @observable type: string;

  constructor(initialValue: string | number, type: string) {
    this.type = type;
    this.id = initialValue;
    const { formEditorPage } = useRootStore();
    const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData;
    this.items = itemsInStore.schema.reduce(
      (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
        if (el.type === type && !el.hide) {
          return [...accum, { id: el.id, name: el.displayName }];
        } else {
          return [...accum];
        }
      },
      []
    );
  }

  @action setValue(value: string, id: string | number) {
    this.value = value;
    this.id = id;
  }

  getData(): string | number {
    return this.id;
  }
}

type AdminRemoteUiDropdownSchemaEditorPropsItem = { id: string; name: string };

type AdminRemoteUiDropdownSchemaEditorProps = {
  store: AdminRemoteUiDropdownSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownSchemaEditor = ({ store, label }: AdminRemoteUiDropdownSchemaEditorProps) => {
  // console.log(store.items.indexOf((e: AdminRemoteUiDropdownSchemaEditorPropsItem) => e.name === store.value));
  return useObserver(() => (
    <>
      {store.type}
      <Select
        label={label}
        value={store?.value ?? ""}
        options={store.items}
        selectChange={(item, id) => store.setValue(item, id)}
      />
    </>
  ));
};
