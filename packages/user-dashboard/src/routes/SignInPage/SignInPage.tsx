
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "constants/Routes";
import { Link, route } from "preact-router";
import { InputControlled } from "components/InputControlled";
import { Card } from "components/Card";
import { useRootContext } from "components/RootContext";
import { SignInStore } from "./_store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { QlClientLoginProps } from "api/QlClient";
import { Button } from "components/Button";
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text } from "components/Text";
import { CenterCardLayout } from "layouts/CenterCardLayout";


const schema: SchemaOf<QlClientLoginProps> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill")
})


export const SignInPage: FunctionalComponent = observer(() => {
    const { handleSubmit, control } = useForm<QlClientLoginProps>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const rootState = useRootContext();
    const {isLogined} = rootState
    const { loginAction, isLoading } = useMemo(() => new SignInStore(rootState), [rootState]);

    useEffect(()=>{
        isLogined && route(HOME_ROUTE);
    },[isLogined])

    return (
        <CenterCardLayout 
            title="Вход в личный кабинет"
            subtitle="Войдите или создайте аккаунт">
            <form className="flex flex-col max-w-card-small" onSubmit={handleSubmit(loginAction) as any}>
                <InputControlled 
                    name="email" 
                    label="Адрес электронной почты" 
                    placeholder="Ваша электронная почта" 
                    control={control} 
                    type="email" />
                <InputControlled 
                    name="password" 
                    label="Пароль" 
                    placeholder="Ваш пароль" 
                    control={control} 
                    type="password" />
                <Button className="my-2" text="Войти" type="submit" disabled={isLoading}/>
                <Link href={SIGN_UP_ROUTE}>
                    <Button className="my-2" text="Зарегистрироваться" color="secondary" />
                </Link>
            </form>
        </CenterCardLayout>
    );
});
