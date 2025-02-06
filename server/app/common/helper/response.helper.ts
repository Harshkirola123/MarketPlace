interface IResponse {
  success: boolean;
  message?: string;
  data: object | null | any;
}

export type ErrorResponse = IResponse & {
  error_code: number;
};

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Creates a successful response object.
 *
 * @param {object | null | any} data - The data to be included in the response.
 * @returns {IResponse} An object containing the success status and the provided data.
 */

/******  eb231a92-4f52-4474-b180-5a42b66bd588  *******/
export const createResponse = (data: IResponse["data"]): IResponse => {
  return { data, success: true };
};
