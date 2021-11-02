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
  @observable isValid = true;
  @observable value?: string;
  @observable required?: boolean;
  @observable id: number | string;
  @observable type?: string;

  constructor(initialValue: { id: string | number; required: boolean; type: typeFieldsStrings }) {
    this.id = initialValue.id;
    const { formEditorPage } = useRootStore();
    const itemsInStore: FormSchemaFieldDto[] = formEditorPage.editor?.schemaEditor?.blockData ?? [];
    this.items = itemsInStore.reduce(
      (accum: any[], el: FormSchemaFieldDto) => {
        if (!el.hide) {
          return [...accum, { name: el.displayName, id: el.id, required: el.required, type: el.type }];
        } else {
          return [...accum];
        }
      },
      [{ name: "Empty", id: "", required: false, type: "" }]
    );
    this.value = this.items.find((el) => el.id === this.id)?.name;
    this.type = this.items.find((el) => el.id === this.id)?.type;
  }

  @action setValue(item: string, id: number | string, required?: boolean, type?: string) {
    this.value = item;
    this.id = id;
    this.required = required;
    this.type = type;
  }

  getData(): { id: string | number; required: boolean; type: string } {
    return { id: this.id, required: this.required ?? false, type: this.type ?? "" };
  }
}

type AdminRemoteUiDropdownSchemaEditorPropsItem = {
  name: string;
  id: string;
  required: boolean;
  type: typeFieldsStrings;
};

type AdminRemoteUiDropdownSchemaEditorProps = {
  store: AdminRemoteUiDropdownSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownSchemaEditor = ({ store, label }: AdminRemoteUiDropdownSchemaEditorProps) => {
  console.log(store.items);
  return useObserver(() => (
    <>
      <Select
        label={label}
        value={store.value ?? "Empty"}
        options={store.items}
        selectChange={(item, id, required, type) => store.setValue(item, id, required, type)}
      />
    </>
  ));
};
