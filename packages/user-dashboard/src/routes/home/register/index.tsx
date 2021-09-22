import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Link,
} from "@material-ui/core";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
import { qlClient, QlClientRegisterProps } from "../../../API/ql-client";
import { FunctionalComponent } from "preact";
import { QLInput } from "../../../components/QLInput";
import { SchemaOf,object,string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema:SchemaOf<QlClientRegisterProps> = object({
  firstName: string().matches(/^([^0-9]*)$/,'Must not contain numbers').required("Required to fill"),
  lastName: string().matches(/^([^0-9]*)$/,'Must not contain numbers').required("Required to fill"),
  email: string().required("Required to fill"),
  phone: string().required("Required to fill"),
  password: string().required("Required to fill"),
})


export const Register:FunctionalComponent = () => {
  const { handleSubmit, control} = useForm<QlClientRegisterProps>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSubmitRegister = async (data: QlClientRegisterProps) =>{
    console.log(data)
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
