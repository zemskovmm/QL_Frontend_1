import { useForm } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputControlled } from "@project/components/src/form/InputControlled";
import { Link, route } from "preact-router";
import { Button } from "@project/components/src/ui-kit/Button";
import { useSignUpStore } from "./_store";
import { CenterCardLayout } from "layouts/CenterCardLayout";
import { SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";
import { useLocalesStore } from "stores/LocalesStore";
import { useUserStatuseStore } from "stores/UserStatuseStore";

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
  applicationType?:string;
  entityId?:string;
}

export const SignUpPage: FunctionalComponent<PropsType> = ({applicationType,entityId}) => {
  const { handleSubmit, control } = useForm<FormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { registerAction, isLoading,isSuccess } = useSignUpStore();
  const { isLogined } = useUserStatuseStore()
  const { lang } = useLocalesStore()
  const { SIGN_IN_PATH } = useRouterStore();

  const signInPath = applicationType
  ? SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.getRoute({lang,params:[applicationType,entityId||"0"]}) 
  :SIGN_IN_PATH

  useEffect(() => {
    (isLogined || isSuccess) && route(signInPath);
  }, [isLogined,isSuccess]);

  return (
    <CenterCardLayout
      title="Регистрация"
      subtitle="Пароль должен состоять из заглавных и строчных букв и цифр. Длина - не менее 10 символов."
    >
      <form className="flex flex-col max-w-72" onSubmit={handleSubmit(registerAction) as any}>
        <InputControlled
          className="my-1"
          name="email"
          label="Адрес электронной почты"
          placeholder="Ваша электронная почта"
          control={control}
          type="email"
        />
        <InputControlled
          className="my-1"
          name="password"
          label="Пароль"
          placeholder="Придумайте пароль"
          control={control}
          type="password"
        />
        <InputControlled
          className="my-1"
          name="passwordConfirmation"
          label="Пароль"
          placeholder="Подтвердите пароль"
          control={control}
          type="password"
        />
        <Button className="my-2" text="Зарегистрироваться" type="submit" disabled={isLoading} color={`red`} />
        <Link href={signInPath}>
          <Button className="my-2 w-full" text="Войти" color="gray" />
        </Link>
      </form>
    </CenterCardLayout>
  );
};
