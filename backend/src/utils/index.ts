export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`❌ Missing environment variable: ${key}`);
    return "";
  }
  return value;
};

export { default as catchAsync } from "./catchAsync";
export { default as successResponse } from "./response";
