import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";

export class AdminRemoteUiDropdownEditorStore implements IRemoteUiData {
  @observable isValid = true;
  @observable value: string;
  @observable items: AdminRemoteUiDropdownEditorPropsItem[];

  constructor(initialValue: string, items: AdminRemoteUiDropdownEditorPropsItem[]) {
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

type AdminRemoteUiDropdownEditorPropsItem = { id: string; name: string };

type AdminRemoteUiDropdownEditorProps = {
  store: AdminRemoteUiDropdownEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownEditor = ({ store, label }: AdminRemoteUiDropdownEditorProps) =>
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
