import {observable, computed, action} from "mobx";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {useObserver} from "mobx-react";
import {IRemoteUiData} from "@kekekeks/remoteui/src";
import {FileLoader} from "src/components/fileLoader/FileLoader";
import {AdminButton} from "src/components/common/AdminButton";


export class AdminRemoteUiImageFieldStore implements IRemoteUiData {
  @observable value: number | null;
  constructor(imageId: number | null) {
    this.value = imageId;
  }

  @computed get isValid()
  {
    return this.value != null;
  }

  getData() : any {
    return this.value;
  }
}

export const AdminRemoteUiImageFieldEditor = (props: { store: AdminRemoteUiImageFieldStore }) => {
  const [isOpen, setIsOpen] = useState(false);

  return useObserver(() => (
    <>
    <br />
    {props.store.value
      ? <div className="flex justify-between items-center w-full">
          <img className="mr-2" src={`https://ql.dotlic.ru/api/media/scaled/${props.store.value}?dimension=128`} alt="file"/>
        <AdminButton color={"danger"} onClick={()=>{props.store.value=null}}>
          remove image
        </AdminButton>
        </div>
      : <AdminButton color={"primary"} onClick={()=>{setIsOpen(true);}}>
          Set image
        </AdminButton>
    }
    {isOpen && <Suspense fallback={<div>Loading...</div>}>
        <FileLoader selectMedia={(id)=>{props.store.value=id;setIsOpen(false)}} />
    </Suspense>}
  </>));
}
