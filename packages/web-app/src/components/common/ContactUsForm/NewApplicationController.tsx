import React, { FC, useState } from "react";
import cn from "classnames";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import styles from "./NewApplicationController.module.css";
import { DashboardNewApplication } from "./DashboardNewApplication";
import { ContactUsFormController } from "./ContactUsFormController";

type NewApplicationControllerPropsType = {
  onDismiss: () => void
  applicationType:ApplicationType;
  entityId:number;
}

const NewApplicationController:FC<NewApplicationControllerPropsType> = ({applicationType, entityId, onDismiss }) => {
  const [isUsForm, setUsForm] = useState(false);
  
  if (isUsForm){
    return <ContactUsFormController onDismiss={onDismiss} />;
  }
  return <DashboardNewApplication 
    applicationType={applicationType} 
    entityId={entityId}
    onDismiss={onDismiss}
    onUsForm={()=>setUsForm(true)}
  />
};

type NewApplicationButtonPropsType = {
  applicationType:ApplicationType;
  entityId:number;
  className?: string;
  footer?: boolean;
}

export const NewApplicationButton:FC<NewApplicationButtonPropsType> = ({applicationType,entityId,className,footer, children   }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type={"button"}
        className={
          footer
            ? className ? className : ""
            : cn(
                styles.NewApplicationButton,
                "bg-bgprimary",
                "rounded-primary",
                "font-medium",
                "flex",
                "items-center",
                "text-secondary",
                className,
              )
        }
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className={`${footer ? "" : "hidden md:block"}`}>{children}</span>
      </button>
      {isOpen && <NewApplicationController
        applicationType={applicationType}
        entityId={entityId}
        onDismiss={() => setIsOpen(false)} 
      />}
    </>
  );
};
