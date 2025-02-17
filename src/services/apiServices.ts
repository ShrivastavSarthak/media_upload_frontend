import { ResponseInterface } from "@/shared/interface/api-interface";



export const apiResponse = (
  url: string,
  reqType: string,
  headers: string,
  body?: any
) => {
  if (!body) {
    return {
      url,
      method: reqType,
      headers: {
        Authorization: `Bearer ${headers}`,
      },
    };
  }


  return {
    url,
    method: reqType,
    headers: {
      Authorization: `Bearer ${headers}`,
    },
    body,
  };
};

export const responseWrapper = async (response: any, meta: any) => {
  const statusCode = meta?.response?.status;

  if (statusCode !== 401) {
  }

  const result: ResponseInterface = {
    response: response,
    statusCode: statusCode,
  };
  return result;
};
