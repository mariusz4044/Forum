export class AppError extends Error {
  status: number;
  data?: any;

  constructor(message: string, data?: any, status: number = 400) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
