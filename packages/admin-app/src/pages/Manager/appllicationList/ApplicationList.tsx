import React, { useEffect, useState } from "react";
import { AdminApi } from "../../../clients/adminApiClient";

const data = {
  page: 0,
  pageSize: 10,
  type: "",
  status: "",
  isAnswer: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const ApplicationList = () => {
  const [items, setItems] = useState({});
  useEffect(() => {
    async function Appl() {
      try {
        const json: any = await AdminApi.getManagerApplication(data);
        return setItems(json);
      } catch (e) {
        alert(e);
      }
    }
    Appl();
    console.log("1");
  }, []);
  return <pre>{JSON.stringify(items, null, 2)}</pre>;
};
