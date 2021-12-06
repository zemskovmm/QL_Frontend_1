import { Preload } from "@project/components/src/ui-kit/Preload";
import React, { FC } from "react";
import { Route, Navigate } from "react-router-dom";
import { SIGN_IN_ROUTE } from "src/constants";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";

type PropsType = {
  redirectTo?: string;
};

export const SecureRoute: FC<PropsType> = ({ children, redirectTo = SIGN_IN_ROUTE }) => {
  const { isAuthorized, isNotAuthorized } = useUserStatuseStore();
  if (isAuthorized) return <>{children}</>;
  if (isNotAuthorized) return <Navigate to={redirectTo} />;
  return <Preload isLoading />;
};
