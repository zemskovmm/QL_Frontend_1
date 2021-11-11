import { ApiClientBase } from "@project/components/src/api/apiClientBase";

export class FilesApiUsers extends ApiClientBase {
  postUserFile = async (props: FormData) => this.sendRequest("personal/media", props, "POST", true);
  deleteUserFile = async (props: number) => this.sendRequest(`personal/media/${props}`, null, "DELETE");
}

export const filesUsersApi = new FilesApiUsers();
