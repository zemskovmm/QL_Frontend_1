import { useCallback, useEffect } from "react";
import React, { FC, useState, createContext, useContext } from "react";

interface MediaStore {
  postMedia: (data: FormData) => Promise<number>;
  deleteMedia: (id: number) => Promise<void>;
}

const DEFAULT_MEDIA_STORE: MediaStore = {
  postMedia: () => {
    throw "postMedia not set";
  },
  deleteMedia: () => {
    throw "deleteMedia not set";
  },
};

export interface FormBuilderContext {
  info: any;
  setInfo: (initInfo: any) => void;
  setValueInfo: (key: string | number, value: any) => void;
  mediaStore: MediaStore;
  setMediaStore: (store: MediaStore) => void;
  clear: () => void;
}

const FormBuilderContext = createContext<FormBuilderContext>({
  info: {},
  setInfo: () => {},
  setValueInfo: () => {},
  mediaStore: DEFAULT_MEDIA_STORE,
  setMediaStore: () => {},
  clear: () => {},
});

export const useFormBuilderContext = (): FormBuilderContext => {
  return useContext(FormBuilderContext);
};

export const FormBuilderProvider: FC = ({ children }) => {
  const [info, setInfo] = useState<{ [key: string]: any }>({});
  const [mediaStore, setMediaStore] = useState<MediaStore>(DEFAULT_MEDIA_STORE);

  const clear = useCallback(() => {
    setInfo({});
    setMediaStore(DEFAULT_MEDIA_STORE);
  }, [setInfo, setMediaStore]);

  const setValueInfo = useCallback(
    (key: string | number, value: any) => {
      setInfo((old) => {
        return { ...old, [key]: value };
      });
    },
    [setInfo]
  );

  return (
    <FormBuilderContext.Provider value={{ info, setInfo, setValueInfo, mediaStore, setMediaStore, clear }}>
      {children}
    </FormBuilderContext.Provider>
  );
};
