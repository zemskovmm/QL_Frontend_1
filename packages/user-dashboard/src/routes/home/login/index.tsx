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
import { QlClientLoginProps } from "../../../API/ql-client";
import { FunctionalComponent } from "preact";

type ControlledInput<T extends FieldValues, TExtra> = FunctionalComponent<TExtra & { control: Control<T, object> }>;
type JustControlledInput<T extends FieldValues> = ControlledInput<T, unknown>;

const EmailInput: JustControlledInput<QlClientLoginProps> = ({ control }) => (
  <Controller
    name={"email"}
    control={control}
    defaultValue={""}
    render={({ field }) => (
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input {...field} type="email" />
      </FormControl>
    )}
  />
);

const PasswordInput: JustControlledInput<QlClientLoginProps> = ({ control }) => (
  <Controller
    name={"password"}
    control={control}
    defaultValue={""}
    render={({ field }) => (
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input {...field} type="password" />
      </FormControl>
    )}
  />
);

export const Root = () => {
  const { handleSubmit, control } = useForm<QlClientLoginProps>();

  return (
    <Card className="w-2/4">
      <form onSubmit={handleSubmit(console.log) as any}>
        <CardContent>
          <FormGroup>
            <h2>Login into system</h2>
          </FormGroup>
          <FormGroup>
            <EmailInput control={control} />
          </FormGroup>
          <FormGroup>
            <PasswordInput control={control} />
          </FormGroup>
        </CardContent>
        <CardActions>
          <FormControl>
            <Button type="submit" color="primary">
              Login
            </Button>
          </FormControl>
          <Link href="/register">
            <FormControl>
              <Button color="primary">Register</Button>
            </FormControl>
          </Link>
        </CardActions>
      </form>
    </Card>
  );
};
