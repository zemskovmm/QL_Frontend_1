import { RequestTracking } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "../../RootStore";
import { AdminApi } from "../../../clients/adminApiClient";
import { IsEmail, IsNotEmpty, MinLength, validate } from "@keroosha/class-validator";
import { reduceValidationErrorsToErrors } from "../../../utils/util";

type ManagerCreateStoreErrors = {
  email?: string[];
  password?: string[];
  name?: string[];
};

export type ManagerCreateDto = {
  email: string;
  password: string;
  name: string;
};

export class ManagerCreateStore extends RequestTracking {
  @observable errors: ManagerCreateStoreErrors = {};
  @IsEmail(this, { message: "Invalid email" })
  @observable
  email: string = "";

  @MinLength(10, { message: "Min length password to 10" })
  @observable
  password: string = "";

  @IsNotEmpty({ message: "Name required" })
  @observable
  name: string = "";

  constructor(public rootStore: RootStore) {
    super();
  }

  @action reset() {
    this.password = "";
    this.email = "";
    this.name = "";
  }

  @action async register() {
    const errors = await validate(this);

    if (errors.length) {
      this.errors = reduceValidationErrorsToErrors(errors);
      return;
    }

    const data: ManagerCreateDto = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
    try {
      await AdminApi.postManagerCreate(data);
      alert("Manager Created");
      this.reset();
    } catch (e) {
      alert(e);
    }
  }
}
