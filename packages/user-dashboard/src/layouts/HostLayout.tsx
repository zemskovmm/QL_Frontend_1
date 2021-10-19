import { ComponentChildren, FunctionalComponent, createContext } from "preact";
import { useUserStatuseStore } from "stores/UserStatuseStore";

type PropsType = {
  children: ComponentChildren;
};

export interface IComponentHostDashboard {
  personalInfo: { [key: string]: any };
}

export const ComponentHostDashboardContext = createContext<IComponentHostDashboard | null>(null);

export const HostLayout: FunctionalComponent<PropsType> = ({ children }) => {
  const host: IComponentHostDashboard = {
    personalInfo: useUserStatuseStore().user.personalInfo,
  };
  return <ComponentHostDashboardContext.Provider value={host}>{children}</ComponentHostDashboardContext.Provider>;
};
