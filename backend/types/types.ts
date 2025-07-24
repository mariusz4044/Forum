export interface LoginBody {
  login: string;
  password: string;
}

export interface RegisterData {
  name: string;
  password: string;
  login: string;
}

export type PrismaError = {
  code: number;
};

export interface ResponseValidateData {
  error?: string;
  success?: string;
  patch?: [string];
}
