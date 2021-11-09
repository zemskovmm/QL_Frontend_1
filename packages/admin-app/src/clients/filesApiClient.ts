import { FilesListDto, FolderDto, CreateFolderDto } from "src/interfaces/FilesDto";
import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { request } from "user-dashboard/src/api/QLBaseApi";

export class FilesApiClient extends ApiClientBase {
  getFolder = () => this.sendRequest<FilesListDto>("media/directories");
  getFolderById = (folderId: number) => this.sendRequest<FilesListDto>("media/directories/" + folderId);
  updateFolder = (folderId: number, data: FolderDto) =>
    this.sendRequest("media/directories/" + folderId, data, "PATCH");
  createFolder = (data: CreateFolderDto) => this.sendRequest("media/directories", data);
  loadFile = (data: FormData) => this.sendRequest("admin/media", data, "POST", true);
  deleteFolder = (folderId: number) => this.sendRequest("media/directories/" + folderId, null, "DELETE");
}

export const FilesApi = new FilesApiClient();
