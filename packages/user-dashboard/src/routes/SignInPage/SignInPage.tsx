import { useForm } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { Link, route } from "preact-router";
import { InputControlled } from '@project/components/src/form/InputControlled';
import { useSignInStore } from "./_store";
import { useEffect } from "react";
import { Button } from "@project/components/src/ui-kit/Button";
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CenterCardLayout } from "layouts/CenterCardLayout";
import { UserStatuseLoginProps } from "stores/UserStatuseStore";
import { useRouterStore } from "stores/RouterStore";


const schema: SchemaOf<UserStatuseLoginProps> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill")
})

export const SignInPage: FunctionalComponent = () => {
    const { handleSubmit, control } = useForm<UserStatuseLoginProps>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const {isLoading, isSuccess, loginAction} = useSignInStore();
    const {PROFILE_PATH,SIGN_UP_PATH} = useRouterStore();

    useEffect(()=>{
        isSuccess && route(PROFILE_PATH);
    },[isSuccess])

    return (
        <CenterCardLayout 
            title="Вход в личный кабинет"
            subtitle="Войдите или создайте аккаунт">
            <form className="flex flex-col max-w-card-small" onSubmit={handleSubmit(loginAction) as any}>
                <InputControlled 
                    className="my-1"
                    name="email" 
                    label="Адрес электронной почты" 
                    placeholder="Ваша электронная почта" 
                    control={control} 
                    type="email" />
                <InputControlled 
                    className="my-1"
                    name="password" 
                    label="Пароль" 
                    placeholder="Ваш пароль" 
                    control={control} 
                    type="password" />
                <Button className="my-2" text="Войти" type="submit" disabled={isLoading}/>
                <Link href={SIGN_UP_PATH}>
                    <Button className="my-2" text="Зарегистрироваться" color="secondary"  isFullWidth/>
                </Link>
            </form>
        </CenterCardLayout>
    );
};
