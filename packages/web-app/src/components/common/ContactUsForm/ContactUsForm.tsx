import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { LocalizedText, useLocalizedText } from "src/components/common/LocalizedText";
import React, { FC, useContext, useState } from "react";
import { useIntl } from "react-intl";
import { siteApi } from "src/clients/siteApiClient";
import { useAsyncBusy } from "@project/components/src/utils/asyncBusyEffect";
import { ComponentHostContext } from "@project/components/src/blocks";
import { HtmlPresenter } from "@project/components/src/ui/HtmlPresenter/htmlPresenter";
import classnames from 'classnames/bind';
import styles from "./ContactUsForm.module.css";

const cn = classnames.bind(styles);
const CLASS_NAME = 'ContactUsForm';

export type ContactUsFormPropsType = { 
  onDismiss: () => void; 
  onSuccess: () => void;
}

export const ContactUsForm:FC<ContactUsFormPropsType> = ({ onDismiss, onSuccess}) => {
  const intl = useIntl();
  const cl = useContext(ComponentHostContext);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [com, setCom] = useState("");

  const [isBusy, sendForm] = useAsyncBusy(async () => {
    try {
      await siteApi.sendCallback({
        firstName: name,
        lastName: lastname,
        email: email,
        phone: tel,
        comment: com,
        url: window.location.href,
      });
      onSuccess();
    } catch (e) {
      alert(e);
    }
  });

  return (
    <OverlayDialog cancel={onDismiss}>
      <h3 className={cn(`${CLASS_NAME}__title`)}>{cl?.requestSetting.requestFormTitle}</h3>
      <form
        className={"flex flex-col"}
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <div className={"flex flex-col md:flex-row justify-between mb-0 md:mb-7"}>
          <div className={"flex flex-col md:w-6/12 md:mr-3"}>
            <div className={cn(`${CLASS_NAME}__formColTitle`,"hidden md:block")}>
              {cl?.requestSetting.requestFormLeftTitle}
            </div>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={cn(`${CLASS_NAME}__labelTitle`)}>
                <LocalizedText id="contactUs_name" />
              </div>
              <input
                className={cn(`${CLASS_NAME}__input`)}
                placeholder={useLocalizedText({ id: "contactUs_nameLabel" }, intl)}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={cn(`${CLASS_NAME}__labelTitle`)}>
                <LocalizedText id="contactUs_lastname" />
              </div>
              <input
                className={cn(`${CLASS_NAME}__input`)}
                placeholder={useLocalizedText({ id: "contactUs_lastnameLabel" }, intl)}
                required
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
          <div className={"flex flex-col md:w-6/12 md:ml-3"}>
            <div className={cn(`${CLASS_NAME}__formColTitle`," hidden md:block")}>
              {cl?.requestSetting.requestFormRightTitle}
            </div>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={cn(`${CLASS_NAME}__labelTitle`)}>
                <LocalizedText id="contactUs_email" />
              </div>
              <input
                className={cn(`${CLASS_NAME}__input`)}
                placeholder={useLocalizedText({ id: "contactUs_emailLabel" }, intl)}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className={"w-full mb-2 md:mb-4"}>
              <div className={cn(`${CLASS_NAME}__labelTitle`)}>
                <LocalizedText id="contactUs_tel" />
              </div>
              <input
                className={cn(`${CLASS_NAME}__input`)}
                placeholder={useLocalizedText({ id: "contactUs_telLabel" }, intl)}
                required
                onChange={(e) => setTel(e.target.value)}
              />
            </label>
          </div>
        </div>
        <label className="applyModal__label-textarea">
          <div className={cn(`${CLASS_NAME}__labelTitle`)}>
            <LocalizedText id="contactUs_com" />
          </div>
          <textarea
            className={cn(`${CLASS_NAME}__textarea`)}
            placeholder={useLocalizedText({ id: "contactUs_comLabel" }, intl)}
            onChange={(e) => setCom(e.target.value)}
          />
        </label>
        <div className={"flex flex-col mb:flex-row justify-center items-center mt-4 mb:mt-11"}>
          <div className="mb-4 w-full">
            <HtmlPresenter text={cl?.requestSetting.requestFormPostText || ""} />
          </div>
          <button disabled={isBusy} className={cn(`${CLASS_NAME}__buttonApply`)} type="submit">
            <LocalizedText id="contactUs_applyButton" />
          </button>
        </div>
      </form>
    </OverlayDialog>
  );
};
