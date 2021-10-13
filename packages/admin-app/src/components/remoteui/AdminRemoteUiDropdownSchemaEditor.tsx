import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import Select from "@project/components/src/ui/Select/Select";
import { useObserver } from "mobx-react";
import { RootStore } from "../../stores/RootStore";
import { useRootStore } from "../../utils/rootStoreUtils";
import { FormSchemaFieldDto } from "../../interfaces/GlobalSettingsDto";

export class AdminRemoteUiDropdownTextSchemaEditorStore implements IRemoteUiData {
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

type AdminRemoteUiDropdownTextSchemaEditorProps = {
  store: AdminRemoteUiDropdownTextSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownTextSchemaEditor = ({ store, label }: AdminRemoteUiDropdownTextSchemaEditorProps) => {
  const { formEditorPage } = useRootStore();
  const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData;
  const items = itemsInStore.schema.reduce(
    (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
      if (el.type === "text" && !el.hide) {
        return [...accum, { id: el.id, name: el.displayName }];
      } else {
        return [...accum];
      }
    },
    []
  );

  return useObserver(() => (
    <>
      <Select
        label={label}
        value={
          items.filter((e: AdminRemoteUiDropdownSchemaEditorPropsItem) => e.id === store.value).length > 0
            ? store.value
            : ""
        }
        options={items}
        selectChange={(item, id) => store.setValue(item)}
      />
    </>
  ));
};

export class AdminRemoteUiDropdownFileSchemaEditorStore implements IRemoteUiData {
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

type AdminRemoteUiDropdownFileSchemaEditorProps = {
  store: AdminRemoteUiDropdownFileSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownFileSchemaEditor = ({ store, label }: AdminRemoteUiDropdownFileSchemaEditorProps) => {
  const { formEditorPage } = useRootStore();
  const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData;
  const items = itemsInStore.schema.reduce(
    (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
      if (el.type === "file" && !el.hide) {
        return [...accum, { id: el.id, name: el.displayName }];
      } else {
        return [...accum];
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

export class AdminRemoteUiDropdownFileListSchemaEditorStore implements IRemoteUiData {
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

type AdminRemoteUiDropdownFileListSchemaEditorProps = {
  store: AdminRemoteUiDropdownFileListSchemaEditorStore;
  label?: string;
};

export const AdminRemoteUiDropdownFileListSchemaEditor = ({
  store,
  label,
}: AdminRemoteUiDropdownFileListSchemaEditorProps) => {
  const { formEditorPage } = useRootStore();
  const itemsInStore = formEditorPage.editor?.schemaEditor?.blockData;
  const items = itemsInStore.schema.reduce(
    (accum: AdminRemoteUiDropdownSchemaEditorPropsItem[], el: FormSchemaFieldDto) => {
      if (el.type === "fileList" && !el.hide) {
        return [...accum, { id: el.id, name: el.displayName }];
      } else {
        return [...accum];
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
