/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ApiErrorStatus {
  UNKNOWN = 0,
  ERROR = 500,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
}

interface IApiError {
  status: ApiErrorStatus;
  message: string;
  data: any;
}

export default IApiError;
