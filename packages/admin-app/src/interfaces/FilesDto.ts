interface FilesListItemDto {
  id: number,
  title: string
}

export interface FilesListDto {
  title: string | null,
  parentId: number | null,
  directories: FilesListItemDto[],
  media: FilesListItemDto[],
  id: number
}

export interface FolderDto {
  title: string
}

export interface CreateFolderDto {
  title: string,
  parentId?: number
}
