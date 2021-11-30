import { useForm } from "react-hook-form";
import { FC } from "react";
import { useEffect } from "react";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { Button } from "@project/components/src/ui-kit/Button";
import { useSignUpStore } from "./_store";
import { CenterCardLayout } from "src/layouts/CenterCardLayout";
import { SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE, useRouterStore } from "src/stores/RouterStore";
import { useLocalesStore } from "src/stores/LocalesStore";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";
import { Link } from "react-router-dom";

export type FormFields = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema: SchemaOf<FormFields> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill"),
  passwordConfirmation: string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Required to fill"),
});

type PropsType = {
  applicationType?: string;
  entityId?: string;
};

export const SignUpPage: FC<PropsType> = ({ applicationType, entityId }) => {
  const { handleSubmit, control } = useForm<FormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { registerAction, isLoading, isSuccess } = useSignUpStore();
  const { isLogined } = useUserStatuseStore();
  const {
    lang,
    SIGN_IN_REG,
    SIGN_IN_ENTRY,
    SIGN_UP_EMAIL_LABEL,
    SIGN_UP_EMAIL_PLACEHOLDER,
    SIGN_UP_PASSWORD_CONF_LABEL,
    SIGN_UP_PASSWORD_CONF_PLACEHOLDER,
    SIGN_UP_PASSWORD_LABEL,
    SIGN_UP_PASSWORD_PLACEHOLDER,
    SIGN_UP_SUBTITLE,
    SIGN_UP_TITLE,
  } = useLocalesStore();
  const { SIGN_IN_PATH } = useRouterStore();

  const signInPath = applicationType
    ? SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [applicationType, entityId || "0"] })
    : SIGN_IN_PATH;

  // useEffect(() => {
  //   (isLogined || isSuccess) && route(signInPath);
  // }, [isLogined, isSuccess]);

  return (
    <CenterCardLayout title={SIGN_UP_TITLE} subtitle={SIGN_UP_SUBTITLE}>
      <form className="flex flex-col md:px-28 w-full" onSubmit={handleSubmit(registerAction) as any}>
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
          className="mb-4"
          name="password"
          label={SIGN_UP_PASSWORD_LABEL}
          placeholder={SIGN_UP_PASSWORD_PLACEHOLDER}
          control={control}
          type="password"
          sign={true}
        />
        <InputControlled
          className="mb-8"
          name="passwordConfirmation"
          label={SIGN_UP_PASSWORD_CONF_LABEL}
          placeholder={SIGN_UP_PASSWORD_CONF_PLACEHOLDER}
          control={control}
          type="password"
          sign={true}
        />
        <Button className="mb-4" text={SIGN_IN_REG} type="submit" disabled={isLoading} color={`red`} />
        <Link to={signInPath}>
          <Button className="my-2 w-full" text={SIGN_IN_ENTRY} color="gray" />
        </Link>
      </form>
    </CenterCardLayout>
  );
};
