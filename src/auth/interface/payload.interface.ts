export interface IUserPayload {
  sub: string;
  email: string;
  name: string;
  facility: string;
  department: string;
  role: string;
  permissions: string[];
  session: string;
}
