export const success = (statusCode: any, result: any) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

export const error = (statusCode: any, result: any) => {
  return {
    status: "error",
    statusCode,
    result,
  };
};
