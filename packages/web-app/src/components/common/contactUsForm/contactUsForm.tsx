import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { useLocalizedText } from "src/components/common/LocalizedText";
import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import cn from "classnames";

import styles from "./contactUsForm.module.css";
import { UsForm } from "./_components/UsForm";
import { DashboardOrUsForm } from "./_components/DashboardOrUsForm";


export const SuccessMessage = (props: { onDismiss: () => void }) => {
  const intl = useIntl();
  return (
    <OverlayDialog cancel={props.onDismiss}>
      <div
        className={"text-center"}
        dangerouslySetInnerHTML={{ __html: useLocalizedText({ id: "contactUs_thanks" }, intl) }}
      />
    </OverlayDialog>
  );
};

export type ContactUsFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  url: string;
};

type ContactUsFormPropsType = {
  onDismiss: () => void;
  onSuccess: () => void;
  
}



export const ContactUsForm:FC<ContactUsFormPropsType> = ({ onDismiss, onSuccess}) => {
  const [isForm, setIsForm] = useState(false);

  return <>
    {isForm ? 
      <UsForm onDismiss={onDismiss} onSuccess={onSuccess}/> :
      <DashboardOrUsForm onDismiss={onDismiss} onUsForm={()=>{setIsForm(true)}} />
    }
  </>
};

export const ContactUsFormController = (props: { onDismiss: () => void }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) return <SuccessMessage onDismiss={props.onDismiss} />;
  return <ContactUsForm onDismiss={props.onDismiss} onSuccess={() => setIsSuccess(true)} />;
};

export const ContactUsFormButton = (props: { children: React.ReactNode; footer?: boolean; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type={"button"}
        className={
          props.footer
            ? props.className
              ? props.className
              : ""
            : cn(
                styles.button,
                "bg-bgprimary",
                "rounded-primary",
                "font-medium",
                "flex",
                "items-center",
                "text-secondary",
                props.className ? props.className : ""
              )
        }
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className={`${props.footer ? "" : "hidden md:block"}`}>{props.children}</span>
      </button>
      {isOpen ? <ContactUsFormController onDismiss={() => setIsOpen(false)} /> : null}
    </>
  );
};

type PostScriptProps = {
  data: {
    name: string;
    description: string;
  };
};

export const PostScript: FC<PostScriptProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.postScriptButton}>
        {data.description && (
          <div
            className={styles.postScriptButton__description}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
        <button
          className={styles.postScriptButton__button}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {data.name}
        </button>
      </div>
      {isOpen ? <ContactUsFormController onDismiss={() => setIsOpen(false)} /> : null}
    </>
  );
};
