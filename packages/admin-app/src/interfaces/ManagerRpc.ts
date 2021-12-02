export interface ManagerListDto {
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
