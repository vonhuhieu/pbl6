import { HttpStatusCode } from "../constants/http";
import { IError } from "../constants/messageConstant";

class AppError extends Error {
  message: string; 
  code: string;
  constructor(
    public statusCode: HttpStatusCode,
    public error: IError
  ) {
    super(error.message);
    this.code = error.code;
  }
}

export default AppError;
