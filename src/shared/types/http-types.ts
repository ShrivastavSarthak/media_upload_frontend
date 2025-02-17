export interface HttpRequest {
  url: string;
  payload?: any;
  reqType: string;
}

export interface ResponseInterface {
  data?: {
    statusCode: number;
    message: string;
  };
}
