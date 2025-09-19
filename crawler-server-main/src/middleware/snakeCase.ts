import { Response, Request, NextFunction } from "express";
import { camelCase, isArray, isObject, mapKeys, mapValues, snakeCase } from "lodash";

const toSnakeCase = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map(toSnakeCase);
  } else if (isObject(obj)) {
    return mapKeys(mapValues(obj, toSnakeCase), (_: any, key: any) => snakeCase(key));
  } else {
    return obj;
  }
};
const toCamelCase = (obj: any): any => {
    if (isArray(obj)) {
      return obj.map(toCamelCase);
    } else if (isObject(obj)) {
      return mapKeys(mapValues(obj, toCamelCase), (_: any, key: any) => camelCase(key));
    } else {
      return obj;
    }
  };

  
export const snakeCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;
  res.json = function (data: any) {
    const transformedData = toSnakeCase(data);
    return oldJson.call(this, transformedData);
  };

  next();
};

export const camelCaseMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.body) {
      req.body = toCamelCase(req.body);
    }
  
    // if (req.query) {
    //   req.query = toCamelCase(req.query);
    // }
  
    next();
  };