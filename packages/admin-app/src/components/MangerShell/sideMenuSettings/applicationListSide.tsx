import React, { useContext, useEffect, useState } from "react";
import { SideSettings } from "../../common/ManagerLayout";

export const ApplicationListSide = () => {
  const [size, setSize] = useState("20");
  const ct = useContext(SideSettings);
  useEffect(() => {
    const old = ct!.list;
    old.pageSize = Number(size);
    ct!.list = old;
    ct!.text = size;
    console.log("2");
    console.log(ct!.list);
  }, [size]);
  return (
    <div>
      <label className={`flex justify-between mb-5`}>
        <span>Page size</span>
        <select className={`text-black`} onChange={(e) => setSize(e.target.value)} value={size}>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
        </select>
      </label>
      <button>course</button>
    </div>
  );
};
