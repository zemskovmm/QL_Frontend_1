import React, { FC, useState } from "react";
import cn from "classnames";

import styles from "./ContactUsFormController.module.css";
import { ContactUsForm } from "./ContactUsForm";
import { SuccessMessage } from "./SuccessMessage";

export const ContactUsFormController = (props: { onDismiss: () => void }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) return <SuccessMessage onDismiss={props.onDismiss} />;
  return <ContactUsForm onDismiss={props.onDismiss} onSuccess={() => setIsSuccess(true)} />;
};


type ContactUsFormButtonPropsType = {
  className?: string
  footer?: boolean;
}

export const ContactUsFormButton:FC<ContactUsFormButtonPropsType> = ({className,footer, children   }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type={"button"}
        className={
          footer
            ? className ? className : ""
            : cn(
                styles.ContactUsFormButton,
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
