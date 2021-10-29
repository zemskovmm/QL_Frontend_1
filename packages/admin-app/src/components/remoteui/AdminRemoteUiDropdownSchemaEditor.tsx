import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";
import { useRootStore } from "../../utils/rootStoreUtils";
import { FormSchemaFieldDto } from "../../interfaces/GlobalSettingsDto";

enum typeFields {
  DropdownSchemaText = "text",
  DropdownSchemaFile = "file",
  DropdownSchemaFileList = "fileList",
}

type typeFieldsStrings = keyof typeof typeFields;

export class AdminRemoteUiDropdownSchemaEditorStore implements IRemoteUiData {
  @observable items: AdminRemoteUiDropdownSchemaEditorPropsItem[];
  @observable type: string;
  @observable isValid = true;
  @observable value?: string;
  @observable required?: boolean;
  @observable id: number | string;

  constructor(initialValue: { id: string | number; required: boolean }, type: typeFieldsStrings) {
    this.type = type;
    this.id = initialValue.id;
    const { formEditorPage } = useRootStore();
    const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData ?? [];
    this.items = itemsInStore.reduce(
      (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
        if (el.type === typeFields[type].toString() && !el.hide) {
          return [...accum, { name: el.displayName, id: el.id, required: el.required }];
        } else {
          return [...accum];
        }
      },
      [{ name: "Empty", id: "", required: false }]
    );
    this.value = this.items.find((el) => el.id === this.id)?.name;
  }

  @action setValue(item: string, id: number | string, required?: boolean) {
    this.value = item;
    this.id = id;
    this.required = required;
  }

  getData(): { id: string | number; required: boolean } {
    return { id: this.id, required: this.required ?? false };
  }
}

type AdminRemoteUiDropdownSchemaEditorPropsItem = { name: string; id: string; required: boolean };

type AdminRemoteUiDropdownSchemaEditorProps = {
  store: AdminRemoteUiDropdownSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownSchemaEditor = ({ store, label }: AdminRemoteUiDropdownSchemaEditorProps) => {
  console.log(store.items);
  return useObserver(() => (
    <>
      {store.type}
      <Select
        label={label}
        value={store.value ?? "Empty"}
        options={store.items}
        selectChange={(item, id, required) => store.setValue(item, id, required)}
      />
    </>
  ));
};
