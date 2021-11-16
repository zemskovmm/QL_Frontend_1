import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { Text } from "@project/components/src/ui-kit/Text";
import { Button } from "@project/components/src/ui-kit/Button";
import { DASHBOARD_PUBLIC_BASE_URL } from "@project/components/src/baseUrl";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import React, { FC, useContext} from "react";
import { useIntl } from "react-intl";
import classnames from "classnames/bind";
import styles from "./DashboardNewApplication.module.css";

const cn = classnames.bind(styles);
const CLASS_NAME = 'DashboardNewApplication';

type PropsType = {
  applicationType:ApplicationType;
  entityId:number;
  onDismiss: () => void;
  onUsForm: () => void;
}

export const DashboardNewApplication:FC<PropsType> = ({ onDismiss,onUsForm,applicationType,entityId}) => {
  const lang = useIntl().locale;
  const dashboardUrl = `${DASHBOARD_PUBLIC_BASE_URL}/${lang}/create-applications/${applicationType}/${entityId}}`;

  return (
    <OverlayDialog cancel={onDismiss}>
      <div className={"text-center flex flex-col"}>
        <Text text="Как вы хотите подать заявку" size="title-medium"/>
        <a href={dashboardUrl}>Личный кабинет</a>
        <Button onClick={onUsForm} text="Форма обратной связи"/>
      </div>
    </OverlayDialog>
  );
};
