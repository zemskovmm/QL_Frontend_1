enum PredefinedTypes {
  CheckBox = "CheckBox",
  String = "String",
  Number = "Number",
  Integer = "Integer",
  StringList = "StringList",
  List = "List",
  Radio = "Radio",
  Select = "Select",
  FileBase64 = "FileBase64",
  Custom = "Custom",
  TextArea = "TextArea",
  OrderedMultiSelect = "OrderedMultiSelect"
}

export interface BlockUiPossibleValue {
  id: string | null;
  name: string;
}

export interface BlockUiFieldDefinition {
  id: string;
  name: string;
  description?: string;
  placeholder?: string;
  type: string | PredefinedTypes;
  listType?: string;
  possibleValues?: BlockUiPossibleValue[],
  nullable?: boolean,
  customType?: string,
  alwaysExpanded?: boolean
}


export interface BlockSubTypeDefinition {
  fields: BlockUiFieldDefinition[];
}

export interface BlockUiDefinition extends BlockSubTypeDefinition {
  fields: BlockUiFieldDefinition[];
  subTypes?: { [name: string]: BlockSubTypeDefinition }
}

export interface BlockTypeInfo {
  id: string,
  name: string;
  definition: BlockUiDefinition;
  renderer: (props: any) => any;
  initialData: any;
}

export interface TypedBlockTypeInfo<T> extends BlockTypeInfo {
  initialData: T;
}

