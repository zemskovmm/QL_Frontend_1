import React, { FC, createContext } from "react";
// import { useUserStatuseStore } from "stores/UserStatuseStore";
import { filesUsersApi } from "./filesApiUsers";

export interface IComponentHostDashboard {
  personalInfo: { [key: string]: any };
  postMedia: (data: FormData) => void;
  deleteMedia: (id: number) => void;
}

export const ComponentHostDashboardContext = createContext<IComponentHostDashboard | null>(null);

export const HostLayout: FC = ({ children }) => {
  const host: IComponentHostDashboard = {
    personalInfo: {},
    postMedia: async (data: FormData) => await filesUsersApi.postUserFile(data),
    deleteMedia: async (id: number) => await filesUsersApi.deleteUserFile(id),
  };
  return <ComponentHostDashboardContext.Provider value={host}>{children}</ComponentHostDashboardContext.Provider>;
};
