import { useForm } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { Link, route } from "preact-router";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { useSignInStore } from "./_store";
import { useEffect } from "react";
import { Button } from "@project/components/src/ui-kit/Button";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CenterCardLayout } from "layouts/CenterCardLayout";
import { UserStatuseLoginProps, useUserStatuseStore } from "stores/UserStatuseStore";
import {
  CREATE_APPLICATIONS_TEMPLATE,
  SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  useRouterStore,
} from "stores/RouterStore";
import { useLocalesStore } from "stores/LocalesStore";
import reg from "./reg.svg";

const schema: SchemaOf<UserStatuseLoginProps> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill"),
});

type PropsType = {
  applicationType?: string;
  entityId?: string;
};

export const SignInPage: FunctionalComponent<PropsType> = ({ applicationType, entityId }) => {
  const { handleSubmit, control } = useForm<UserStatuseLoginProps>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { isLoading, loginAction } = useSignInStore();
  const { isLogined } = useUserStatuseStore();
  const { lang, SIGN_IN_REG, SIGN_IN_ENTRY, SIGN_IN_SUBTITLE, SIGN_IN_TITLE } = useLocalesStore();
  const { PROFILE_PATH, SIGN_UP_PATH } = useRouterStore();

  const signUpPath = applicationType
    ? SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
    : SIGN_UP_PATH;

  useEffect(() => {
    const successPath = applicationType
      ? CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
      : PROFILE_PATH;
    isLogined && route(successPath);
  }, [isLogined, applicationType, entityId]);

  return (
    <CenterCardLayout title={SIGN_IN_TITLE} subtitle={SIGN_IN_SUBTITLE}>
      <form className="flex flex-col md:px-28 w-full" onSubmit={handleSubmit(loginAction) as any}>
        <InputControlled
          className="mb-4"
          name="email"
          label="Адрес электронной почты"
          placeholder="Ваша электронная почта"
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
        <Button className="mb-4" text={SIGN_IN_ENTRY} type="submit" disabled={isLoading} color={`red`} />
        <Link href={signUpPath} className={`w-full flex`}>
          <Button color="gray" className={`w-full flex justify-center items-center`}>
            <span className={`relative`}>
              <img src={reg} alt="" className={"absolute -left-7 top-0.5 bottom-0"} />
              {SIGN_IN_REG}
            </span>
          </Button>
        </Link>
      </form>
    </CenterCardLayout>
  );
};
