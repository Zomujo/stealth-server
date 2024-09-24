export class ApiErrorResponse {
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
  statusCode: number;
  message: string;
}
