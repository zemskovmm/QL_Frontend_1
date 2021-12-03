export interface ManagerListSettingsDto {
  page: number;
  pageSize: number;
  type?: string;
  status?: string;
  isAnswered?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface ManagerApplicationListDto {
  items?: ManagerApplicationDto[];
  totalPages: number;
  totalItems: number;
}

export interface ManagerApplicationDto {
  firstName: string;
  lastName: string;
  userId: number;
  type: string;
  entityId: number;
  status: string;
  commonApplicationInfo: any;
  entityTypeSpecificApplicationInfo: any;
  id: number;
}
