
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
import { FunctionalComponent } from "preact";
import { QlClientLoginProps } from "api/QlClient";
import { SIGN_UP_ROUTE } from "constants/Routes";
import { Link } from "preact-router";
import { Input } from "components/Input";


type ControlledInput<T extends FieldValues, TExtra> = FunctionalComponent<TExtra & { control: Control<T, object> }>;
type JustControlledInput<T extends FieldValues> = ControlledInput<T, unknown>;


const SignInPage: FunctionalComponent = () => {
  const { handleSubmit, control } = useForm<QlClientLoginProps>();

  return (

      <form onSubmit={handleSubmit(console.log) as any}>
        <h2>Login into system</h2>
        <Input name="email" label="Email" control={control} type="email" />
        <Input name="password" label="Password" control={control} type="password" />
            <button className="m-2" type="submit">
              Login
            </button>
          <Link href={SIGN_UP_ROUTE}>
              <button className="m-2">Register</button>
          </Link>
      </form>

  );
};

export default SignInPage;
