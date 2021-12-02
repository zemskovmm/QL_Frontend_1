import React, { useState } from "react";
import { ManagerListDto } from "../../../interfaces/ManagerRpc";
import { useObserver } from "mobx-react";

export const ApplicationList = () => {
  const [items, setItems] = useState<ManagerListDto | {}>({});
  return useObserver(() => <div>{/*<pre>{JSON.stringify(ct!.list, null, 2)}</pre>*/}</div>);
};
