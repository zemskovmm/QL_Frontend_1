import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { LocalizedText, useLocalizedText } from "src/components/common/LocalizedText";
import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import cn from "classnames";
import { siteApi } from "src/clients/siteApiClient";
import { useAsyncBusy } from "@project/components/src/utils/asyncBusyEffect";

import styles from "./contactUsForm.module.css";

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
  name: string;
  lastname: string;
  email: string;
  tel: string;
  com: string;
  url: string;
};

export const ContactUsForm = (props: { onDismiss: () => void; onSuccess: () => void }) => {
  const intl = useIntl();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [com, setCom] = useState("");

  const [isBusy, sendForm] = useAsyncBusy(async () => {
    try {
      await siteApi.sendCallback({
        name: name,
        lastname: lastname,
        email: email,
        tel: tel,
        com: com,
        url: window.location.href,
      });
      props.onSuccess();
    } catch (e) {
      alert(e);
    }
  });

  return (
    <OverlayDialog cancel={props.onDismiss}>
      <h3 className={styles.applyModal__title}>
        <LocalizedText id="contactUs_title" />
      </h3>
      <form
        className={"flex flex-col"}
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <div className={"flex flex-col md:flex-row justify-between mb-0 md:mb-7"}>
          <div className={"flex flex-col md:w-6/12 md:mr-3"}>
            <div className={styles.applyModal__formColTitle + " hidden md:block"}>
              <LocalizedText id="contactUs_firstColTitle" />
            </div>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={styles.applyModal__labelTitle}>
                <LocalizedText id="contactUs_name" />
              </div>
              <input
                className={styles.applyModal__input}
                placeholder={useLocalizedText({ id: "contactUs_nameLabel" }, intl)}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={styles.applyModal__labelTitle}>
                <LocalizedText id="contactUs_lastname" />
              </div>
              <input
                className={styles.applyModal__input}
                placeholder={useLocalizedText({ id: "contactUs_lastnameLabel" }, intl)}
                required
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
          <div className={"flex flex-col md:w-6/12 md:ml-3"}>
            <div className={styles.applyModal__formColTitle + " hidden md:block"}>
              <LocalizedText id="contactUs_secondColTitle" />
            </div>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={styles.applyModal__labelTitle}>
                <LocalizedText id="contactUs_email" />
              </div>
              <input
                className={styles.applyModal__input}
                placeholder={useLocalizedText({ id: "contactUs_emailLabel" }, intl)}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={styles.applyModal__labelTitle}>
                <LocalizedText id="contactUs_tel" />
              </div>
              <input
                className={styles.applyModal__input}
                placeholder={useLocalizedText({ id: "contactUs_telLabel" }, intl)}
                required
                onChange={(e) => setTel(e.target.value)}
              />
            </label>
          </div>
        </div>
        <label className="applyModal__label-textarea">
          <div className={styles.applyModal__labelTitle}>
            <LocalizedText id="contactUs_com" />
          </div>
          <textarea
            className={styles.applyModal__textarea}
            placeholder={useLocalizedText({ id: "contactUs_comLabel" }, intl)}
            onChange={(e) => setCom(e.target.value)}
          />
        </label>
        <div className={"flex flex-col mb:flex-row justify-center items-center mt-4 mb:mt-11"}>
          <div
            className={styles.applyModal__description}
            dangerouslySetInnerHTML={{ __html: useLocalizedText({ id: "contactUs_description" }, intl) }}
          />
          <button disabled={isBusy} className={styles.applyModal__buttonApply} type="submit">
            <LocalizedText id="contactUs_applyButton" />
          </button>
        </div>
      </form>
    </OverlayDialog>
  );
};

export const ContactUsFormController = (props: { onDismiss: () => void }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) return <SuccessMessage onDismiss={props.onDismiss} />;
  return <ContactUsForm onDismiss={props.onDismiss} onSuccess={() => setIsSuccess(true)} />;
};

export const ContactUsFormButton = (props: { children: React.ReactNode; footer?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type={"button"}
        className={
          props.footer
            ? ""
            : cn(
                styles.button,
                "bg-bgprimary",
                "rounded-primary",
                "font-medium",
                "flex",
                "items-center",
                "text-secondary"
              )
        }
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className={`hidden md:block`}>{props.children}</span>
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
