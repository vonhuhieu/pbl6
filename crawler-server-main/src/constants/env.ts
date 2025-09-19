import dotenv from "dotenv";
import fs from "fs";

const envPath = fs.existsSync('.env.dev') ? '.env.dev' : '.env';

dotenv.config({ path: envPath });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  // Kiểm tra nếu biến môi trường không được thiết lập và không có giá trị mặc định
  if (value === undefined) {
    throw new Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const TYPE = getEnv("TYPE");
export const POSTGRES_PASSWORD = getEnv("POSTGRES_PASSWORD");
export const POSTGRES_DB = getEnv("POSTGRES_DB");
export const POSTGRES_USER = getEnv("POSTGRES_USER");
export const POSTGRES_HOST = getEnv("POSTGRES_HOST");
export const SERVER_PORT = getEnv("SERVER_PORT");

