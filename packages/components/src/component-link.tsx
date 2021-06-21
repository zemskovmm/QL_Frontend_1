import React, { useContext } from "react";
import { ComponentHostContext } from "./blocks";

export const ComponentLink = (props: { href: string; children: any }) => {
  const cl = useContext(ComponentHostContext);
  if (cl == null) return <a>{props.children}</a>;
  const Impl = cl.linkComponent;
  return (
    <>
      <Impl href={props.href}>{props.children}</Impl>
    </>
  );
};
