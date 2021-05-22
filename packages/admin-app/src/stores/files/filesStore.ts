import {observable, configure, action} from "mobx";
import {FilesListDto} from "src/interfaces/FilesDto";

import { FilesApi } from "src/clients/filesApiClient";

//configure({enforceActions: "observed"})

interface IFilesStore {
  current: FilesListDto,
  currentFolder: number,
  load: (id? : number) => void,
  createFolder: (title: string) => void
}

export const FilesStores = observable<IFilesStore>({
  current: {
    title: null,
    parentId: null,
    directories: [],
    media: [],
    id: 0
  },

  currentFolder: 0,

  async load(folderId) {
    const res:FilesListDto = folderId
      ? await FilesApi.getFolderById(folderId)
      : await FilesApi.getFolder();

    if (res) {
      this.current = res
      this.currentFolder = folderId || 0
    }
  },

  async createFolder(title) {
    const res = this.currentFolder
      ? await FilesApi.createFolder({title,parentId:this.currentFolder})
      : await FilesApi.createFolder({title});

    if (res) {
      this.currentFolder
        ? this.load(this.currentFolder)
        : this.load()
    }
  }
}, {
  load: action.bound,
  createFolder: action.bound
});
/*

export class FilesStore extends RequestTracking {
  @observable current: FilesListDto = {
    title: null,
    parentId: null,
    directories: [],
    media: [],
    id: 0
  };
  @observable currentFolder: number = 0;

  async load(folderId?: number) {
    folderId
      ? this.current = await this.track(() => FilesApi.getFolderById(folderId))
      : this.current = await this.track(() => FilesApi.getFolder());
    this.currentFolder = folderId || 0;
  }
}

*/
