import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";

export class AdminRemoteUiDropdownSchemaEditorStore implements IRemoteUiData {
  @observable isValid = true;
  @observable value: string;
  @observable items: AdminRemoteUiDropdownSchemaEditorPropsItem[];

  constructor(initialValue: string, items: AdminRemoteUiDropdownSchemaEditorPropsItem[]) {
    debugger;
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

export const AdminRemoteUiDropdownSchemaEditor = ({ store, label }: AdminRemoteUiDropdownSchemaEditorProps) =>
  useObserver(() => (
    <>
      <Select
        label={label}
        value={store.value}
        options={store.items}
        selectChange={(item, id) => store.setValue(item)}
      />
    </>
  ));
