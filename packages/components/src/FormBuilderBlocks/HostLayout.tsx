import React, { FC, createContext } from "react";
// import { useUserStatuseStore } from "stores/UserStatuseStore";

export interface IComponentHostDashboard {
  personalInfo: { [key: string]: any };
}

export const ComponentHostDashboardContext = createContext<IComponentHostDashboard | null>(null);

export const HostLayout: FC = ({ children }) => {
  const host: IComponentHostDashboard = {
    personalInfo: {},
  };
  return <ComponentHostDashboardContext.Provider value={host}>{children}</ComponentHostDashboardContext.Provider>;
};
