import { useForm } from "react-hook-form";
import { FC,useEffect, useState } from "react";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { useSignInStore } from "./_store";
import { Button } from "@project/components/src/ui-kit/Button";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CenterCardLayout } from "src/layouts/CenterCardLayout";
import { UserStatuseLoginProps, useUserStatuseStore } from "src/stores/UserStatuseStore";
import reg from "./reg.svg";
import { Link,useNavigate } from "react-router-dom";
import { useLocalized } from "src/locales";
import { CREATE_COMPLITE_APPLICATIONS_ROUTE, PROFILE_ROUTE } from "src/constants";
import { useNewApplicationState } from "src/stores/ApplicationsState";

const schema: SchemaOf<UserStatuseLoginProps> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill"),
});

export const SignInPage: FC = () => {
  const { handleSubmit, control } = useForm<UserStatuseLoginProps>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { isLoading, loginAction } = useSignInStore();
  const { isAuthorized } = useUserStatuseStore();
  const { localizedText } = useLocalized();
  const {createApplicationReq} = useNewApplicationState();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(isAuthorized){
      if(createApplicationReq){
        navigate(CREATE_COMPLITE_APPLICATIONS_ROUTE)
      }
      navigate(PROFILE_ROUTE)
    }
  }, [isAuthorized,createApplicationReq]);

  return (
    <CenterCardLayout title={localizedText('SIGN_IN_TITLE')} subtitle={localizedText('SIGN_IN_SUBTITLE')}>
      <form className="flex flex-col md:px-28 w-full" onSubmit={handleSubmit(loginAction)}>
        <InputControlled
          className="mb-4"
          name="email"
          label={localizedText('SIGN_UP_EMAIL_LABEL')}
          placeholder={localizedText('SIGN_UP_EMAIL_PLACEHOLDER')}
          control={control}
          type="email"
          sign={true}
        />
        <InputControlled
          className="mb-8"
          name="password"
          label="Пароль"
          placeholder="Ваш пароль"
          control={control}
          type="password"
          sign={true}
        />
        <Button className="mb-4" text={localizedText('SIGN_IN_ENTRY')} type="submit" disabled={isLoading} color={`red`} />
        <Link to={"/sign-up"} className={`w-full flex`}>
          <Button color="gray" className={`w-full flex justify-center items-center`}>
            <span className={`relative`}>
              <img src={reg} alt="" className={"absolute -left-7 top-0.5 bottom-0"} />
              {localizedText('SIGN_IN_REG')}
            </span>
          </Button>
        </Link>
      </form>
    </CenterCardLayout>
  );
};
