import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { AdminApi } from "../../../clients/adminApiClient";
import { ManagerListDto } from "../../../interfaces/ManagerRpc";
import { SideSettings } from "../../../components/common/ManagerLayout";
import { useObserver } from "mobx-react";

export const ApplicationList = () => {
  const ct = useContext(SideSettings);
  const [items, setItems] = useState<ManagerListDto | {}>({});
  useEffect(() => {
    async function Appl() {
      try {
        const json: any = await AdminApi.getManagerApplication(ct!.list);
        return setItems(json);
      } catch (e) {
        alert(e);
      }
    }
    Appl();
    console.log("1");
  }, [ct!.list]);
  return useObserver(() => (
    <SideSettings.Consumer>
      {() => (
        <div>
          <div>{ct!.text}</div>
          <pre>{JSON.stringify(ct!.list, null, 2)}</pre>
        </div>
      )}
    </SideSettings.Consumer>
  ));
};
