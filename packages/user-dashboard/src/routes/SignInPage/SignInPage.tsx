import { useForm } from "react-hook-form";
import { FC } from "react";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { useSignInStore } from "./_store";
import { Button } from "@project/components/src/ui-kit/Button";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CenterCardLayout } from "src/layouts/CenterCardLayout";
import { UserStatuseLoginProps, useUserStatuseStore } from "src/stores/UserStatuseStore";
import {
  CREATE_APPLICATIONS_TEMPLATE,
  SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  useRouterStore,
} from "src/stores/RouterStore";
import { useLocalesStore } from "src/stores/LocalesStore";
import reg from "./reg.svg";
import { Link } from "react-router-dom";

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
  const { isLogined } = useUserStatuseStore();
  const {
    lang,
    SIGN_IN_REG,
    SIGN_IN_ENTRY,
    SIGN_IN_SUBTITLE,
    SIGN_IN_TITLE,
    SIGN_UP_EMAIL_LABEL,
    SIGN_UP_EMAIL_PLACEHOLDER,
  } = useLocalesStore();
  // const { PROFILE_PATH, SIGN_UP_PATH } = useRouterStore();

  // const signUpPath = applicationType
  //   ? SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
  //   : SIGN_UP_PATH;

  // useEffect(() => {
  //   const successPath = applicationType
  //     ? CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
  //     : PROFILE_PATH;
  //   isLogined && route(successPath);
  // }, [isLogined, applicationType, entityId]);

  return (
    <CenterCardLayout title={SIGN_IN_TITLE} subtitle={SIGN_IN_SUBTITLE}>
      <form className="flex flex-col md:px-28 w-full" onSubmit={handleSubmit(loginAction) as any}>
        <InputControlled
          className="mb-4"
          name="email"
          label={SIGN_UP_EMAIL_LABEL}
          placeholder={SIGN_UP_EMAIL_PLACEHOLDER}
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
        <Link to={"/sign-up"} className={`w-full flex`}>
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
