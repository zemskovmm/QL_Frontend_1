import { OverlayDialog } from "src/components/common/dialog/OverlayDialog";
import { Text } from "@project/components/src/ui-kit/Text";
import { Button } from "@project/components/src/ui-kit/Button";
import { DASHBOARD_PUBLIC_BASE_URL,NEXT_PUBLIC_API_BASE_URL } from "@project/components/src/baseUrl";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import React, { FC} from "react";
import { useIntl } from "react-intl";
import cn from "classnames";
import styles from "./DashboardOrUsForm.module.css";



const getApplicationUrlParams = ():string =>{
  const url = window.location.href;

  const variants:Array<{reg:RegExp; urlParam:(id:string[])=>string}> = [
    {//University
      reg:/\/[A-Za-z0-9_]{2,3}\/university\/([^\/]+)$/, 
      urlParam: (result)=>`/${ApplicationType.University}/${result[1]}`
    },
    {//Course
      reg:/\/[A-Za-z0-9_]{2,3}\/([^\/]+)\/courses\/([^\/]+)$/, 
      urlParam: (result)=>`/${ApplicationType.Course}/${result[1]}`
    },
    {//Housing
      reg:/\/[A-Za-z0-9_]{2,3}\/housing\/([^\/]+)$/, 
      urlParam: (result)=>`/${ApplicationType.Housing}/${result[1]}`
    },
    {//Visa
      reg:/\/[A-Za-z0-9_]{2,3}\/visa$/, 
      urlParam: (result)=>`/${ApplicationType.Visa}/#`
    },
  ]

  for(let {reg,urlParam} of variants){
    const result = reg.exec(url);
    if(result){
      return urlParam(result);
    }
  }
  return "/#/#"
}

type PropsType = {
  onDismiss: () => void
  onUsForm: () => void
}

export const DashboardOrUsForm:FC<PropsType> = ({ onDismiss,onUsForm }) => {
  const lang = useIntl().locale;
  const dashboardUrl = `${DASHBOARD_PUBLIC_BASE_URL}/${lang}/create-applications${getApplicationUrlParams()}`

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
