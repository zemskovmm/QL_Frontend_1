import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { LocalizedText, useLocalizedText } from "src/components/common/LocalizedText";
import { useState } from "react";
import { useIntl } from "react-intl";
import cn from "classnames";
import { siteApi } from "src/clients/siteApiClient";

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

  const sendForm = async () => {
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
  };

  return (
    <OverlayDialog cancel={props.onDismiss}>
      <h3 className={styles.applyModal__title}>
        <LocalizedText id="contactUs_title" />
      </h3>
      <form className={"flex flex-col"}>
        <div className={"flex justify-between mb-7"}>
          <div className={"flex flex-col w-6/12 mr-3"}>
            <div className={styles.applyModal__formColTitle}>
              <LocalizedText id="contactUs_firstColTitle" />
            </div>
            <label className={"w-full mb-4"}>
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
            <label className={"w-full mb-4"}>
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
          <div className={"flex flex-col w-6/12 ml-3"}>
            <div className={styles.applyModal__formColTitle}>
              <LocalizedText id="contactUs_secondColTitle" />
            </div>
            <label className={"w-full mb-4"}>
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
            <label className={"w-full mb-4"}>
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
        <div className={"flex justify-center items-center mt-11"}>
          <div
            className={styles.applyModal__description}
            dangerouslySetInnerHTML={{ __html: useLocalizedText({ id: "contactUs_description" }, intl) }}
          />
          <button className={styles.applyModal__buttonApply} type="button" onClick={sendForm}>
            <LocalizedText id="contactUs_applyButton" />
          </button>
        </div>
      </form>
    </OverlayDialog>
  );
};

const ContactUsFormController = (props: { onDismiss: () => void }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  if (isSuccess) return <SuccessMessage onDismiss={props.onDismiss} />;
  return <ContactUsForm onDismiss={props.onDismiss} onSuccess={() => setIsSuccess(true)} />;
};

export const ContactUsFormButton = (props: { children: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        className={cn(
          styles.button,
          "bg-bgprimary",
          "rounded-primary",
          "font-medium",
          "flex",
          "items-center",
          "text-secondary"
        )}
        href="#"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {props.children}
      </a>
      {isOpen ? <ContactUsFormController onDismiss={() => setIsOpen(false)} /> : null}
    </>
  );
};
