import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { Text } from "@project/components/src/ui-kit/Text";
import { Button } from "@project/components/src/ui-kit/Button";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import React, { FC, useContext } from "react";
import { useIntl } from "react-intl";
import classnames from "classnames/bind";
import styles from "./DashboardNewApplication.module.css";
import Link from "next/link";

const cn = classnames.bind(styles);
const CLASS_NAME = "DashboardNewApplication";

type PropsType = {
  applicationType: ApplicationType;
  entityId: number;
  onDismiss: () => void;
  onUsForm: () => void;
};

export const DashboardNewApplication: FC<PropsType> = ({ onDismiss, onUsForm, applicationType, entityId }) => {
  const lang = useIntl().locale;

  return (
    <OverlayDialog className={"text-center flex flex-col items-center justify-around h-112 w-160"} cancel={onDismiss}>
      <Text className="mb-4" text="Как вы хотите подать заявку" size="title-large" isBold />
      <Link href={{ pathname: `/create-applications/${applicationType}/${entityId}` }} replace>
        <a>Личный кабинет</a>
      </Link>

      <div className={"flex w-full justify-center items-center"}>
        <div className={"h-px w-48 bg-help m-2"} />
        <Text text="или" size="medium" />
        <div className={"h-px w-48 bg-help m-2"} />
      </div>

      <Button onClick={onUsForm} text="Форма обратной связи" color="red" />
    </OverlayDialog>
  );
};
