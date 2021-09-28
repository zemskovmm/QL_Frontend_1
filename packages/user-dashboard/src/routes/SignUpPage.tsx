import { useForm } from "react-hook-form";

import { FunctionalComponent } from "preact";

import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputControlled } from "components/InputControlled";
import { qlClient } from "api/QlClient";
import { SIGN_IN_ROUTE } from "constants/Routes";
import { Link } from "preact-router";
import { Card } from "components/Card";
import { Button } from "components/Button";


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


const SignUpPage: FunctionalComponent = () => {
  const { handleSubmit, control } = useForm<FormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSubmitRegister = async ({ email, password }: FormFields) => {
    try{
      const result = await qlClient.register({
        email,  password
      });
      alert(result)
    }catch(e){
      alert(e)
    }
  };

  return (
    
    <div className="h-full flex items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(handleSubmitRegister) as any}>
            <h2>Register</h2>
            <InputControlled name="email" label="Email" control={control} type="email" />
            <InputControlled name="password" label="Password" control={control} type="password" />
            <InputControlled name="passwordConfirmation" label="Password confirmation" control={control} type="password" />
            <Button className="m-2" text="Register" type="submit"/>
            <Link href={SIGN_IN_ROUTE}>
              <Button className="m-2" text="Login" color="secondary" />
            </Link>
        </form>
      </Card>
    </div>
   
  );
};

export default SignUpPage;