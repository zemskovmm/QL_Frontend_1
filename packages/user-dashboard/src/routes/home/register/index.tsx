import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormGroup,
  Link,
} from "@material-ui/core";
import { useForm} from "react-hook-form";

import { FunctionalComponent } from "preact";

import { SchemaOf,object,string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { qlClient } from "api/ql-client";
import { QLInput } from "components/QLInput";


export type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
};

const schema:SchemaOf<FormFields> = object({
  firstName: string().matches(/^([^0-9]*)$/,'Must not contain numbers').required("Required to fill"),
  lastName: string().matches(/^([^0-9]*)$/,'Must not contain numbers').required("Required to fill"),
  email: string().required("Required to fill"),
  phone: string().required("Required to fill"),
  password: string().required("Required to fill"),
  passwordConfirmation: string().test('passwords-match', 'Passwords must match', function(value){
    return this.parent.password === value
  }).required("Required to fill"),
})


export const Register:FunctionalComponent = () => {
  const { handleSubmit, control} = useForm<FormFields>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSubmitRegister = async ({firstName,lastName,email,phone,password}: FormFields) =>{
    const result = await qlClient.register({
      firstName,lastName,email,phone,password,personalInfo:{}
    });
  };

  return (
    <Card className="w-2/4">
      <form onSubmit={handleSubmit(handleSubmitRegister) as any}>
        <CardContent>
          <FormGroup>
            <h2>Register</h2>
          </FormGroup>
          <QLInput name="firstName" label="First name" control={control} type="text"/>
          <QLInput name="lastName" label="Last name" control={control} type="text"/>
          <QLInput name="email" label="Email" control={control} type="email"/>
          <QLInput name="phone" label="Phone" control={control} type="tel"/>
          <QLInput name="password" label="Password" control={control} type="password"/>
          <QLInput name="passwordConfirmation" label="Password confirmation" control={control} type="password"/>
          
        </CardContent>
        <CardActions>
          <FormControl>
            <Button type="submit" color="primary">
              Register
            </Button>
          </FormControl>
          <Link href="/login">
            <FormControl>
              <Button color="primary">login</Button>
            </FormControl>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};
