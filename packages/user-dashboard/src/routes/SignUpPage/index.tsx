import { useForm } from "react-hook-form";

import { FunctionalComponent } from "preact";

import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "components/Input";
import { qlClient } from "api/QlClient";
import { SIGN_IN_ROUTE } from "constants/Routes";
import { Link } from "preact-router";


export type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

const schema: SchemaOf<FormFields> = object({
  firstName: string().matches(/^([^0-9]*)$/, 'Must not contain numbers').required("Required to fill"),
  lastName: string().matches(/^([^0-9]*)$/, 'Must not contain numbers').required("Required to fill"),
  email: string().required("Required to fill"),
  phone: string().required("Required to fill"),
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

  const handleSubmitRegister = async ({ firstName, lastName, email, phone, password }: FormFields) => {
    const result = await qlClient.register({
      firstName, lastName, email, phone, password, personalInfo: {}
    });
  };

  return (
    
      <form onSubmit={handleSubmit(handleSubmitRegister) as any}>
          <h2>Register</h2>
          <Input name="firstName" label="First name" control={control} type="text" />
          <Input name="lastName" label="Last name" control={control} type="text" />
          <Input name="email" label="Email" control={control} type="email" />
          <Input name="phone" label="Phone" control={control} type="tel" />
          <Input name="password" label="Password" control={control} type="password" />
          <Input name="passwordConfirmation" label="Password confirmation" control={control} type="password" />
          <button className="m-2" type="submit">
              Register
          </button>
          <Link href={SIGN_IN_ROUTE}>
            <button className="m-2">login</button>
          </Link>
      </form>
   
  );
};

export default SignUpPage;