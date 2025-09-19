import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import { IError } from "../constants/messageConstant";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  error?: IError
) => asserts condition;
/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  error = { message: "An error occurred" } as IError
) => assert(condition, new AppError(httpStatusCode, error));

export default appAssert;
