import { useForm } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputControlled } from "components/InputControlled";
import { SIGN_IN_ROUTE } from "constants/Routes";
import { Link, route } from "preact-router";
import { Button } from "components/Button";
import { useSignUpStore } from "./_store";
import { CenterCardLayout } from "layouts/CenterCardLayout";

export type FormFields = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const schema: SchemaOf<FormFields> = object({
  email: string().required("Required to fill"),
  password: string().required("Required to fill"),
  passwordConfirmation: string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value
  }).required("Required to fill"),
})


export const SignUpPage: FunctionalComponent = () => {
    const { handleSubmit, control } = useForm<FormFields>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const { registerAction, isLoading, isSuccess } = useSignUpStore();

    useEffect(()=>{
        isSuccess && route(SIGN_IN_ROUTE);
    },[isSuccess])

    return (
        <CenterCardLayout 
            title="Регистрация" 
            subtitle="Пароль должен состоять из заглавных и строчных букв и цифр. Длина - не менее 10 символов.">

            <form className="flex flex-col max-w-card-small" onSubmit={handleSubmit(registerAction) as any}>
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
                    placeholder="Придумайте пароль" 
                    control={control} 
                    type="password" />
                <InputControlled 
                    className="my-1"
                    name="passwordConfirmation" 
                    label="Пароль" 
                    placeholder="Подтвердите пароль" 
                    control={control} 
                    type="password" />
                <Button className="my-2" text="Зарегистрироваться" type="submit" disabled={isLoading}/>
                <Link href={SIGN_IN_ROUTE}>
                    <Button className="my-2" text="Войти" color="secondary" isFullWidth/>
                </Link>
            </form>
        </CenterCardLayout>
    );
};