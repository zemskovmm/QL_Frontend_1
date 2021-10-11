import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";
import { RootStore } from "../../stores/RootStore";
import { useRootStore } from "../../utils/rootStoreUtils";
import { FormSchemaFieldDto } from "../../interfaces/GlobalSettingsDto";

export class AdminRemoteUiDropdownSchemaEditorStore implements IRemoteUiData {
  @observable isValid = true;
  @observable value: string;
  @observable items: AdminRemoteUiDropdownSchemaEditorPropsItem[];

  constructor(initialValue: string, items: AdminRemoteUiDropdownSchemaEditorPropsItem[]) {
    this.value = initialValue;
    this.items = items;
  }

  @action setValue(value: string) {
    this.value = value;
  }

  getData(): string {
    return this.value;
  }
}

type AdminRemoteUiDropdownSchemaEditorPropsItem = { id: string; name: string };

type AdminRemoteUiDropdownSchemaEditorProps = {
  store: AdminRemoteUiDropdownSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownSchemaEditor = ({ store, label }: AdminRemoteUiDropdownSchemaEditorProps) => {
  const { formEditorPage } = useRootStore();
  const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData;
  const items = itemsInStore.schema.reduce(
    (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
      if (el.type === "text") {
        return [...accum, { id: el.id, name: el.displayName }];
      } else {
        return;
      }
    },
    []
  );
  return useObserver(() => (
    <>
      <Select label={label} value={store.value} options={items} selectChange={(item, id) => store.setValue(item)} />
    </>
  ));
};
