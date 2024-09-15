export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  createdDateTime: Date;
  lastModifiedDateTime: Date;
}
