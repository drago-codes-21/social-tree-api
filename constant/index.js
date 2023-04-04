const green = "🟢";
const red = "🔴";
const orange = "🟠";

//success
export const SUCCESS_CODE = 200 + green;
export const CREATED = 201 + green;
export const NO_CONTENT = 204 + green;

//client error res
export const BAD_REQUEST = 400 + red;
export const UNAUTHORIZED = 401 + red;
export const FORBIDDEN = 403 + red;
export const NOT_FOUND = 404 + red;

//server error
export const SERVER_ERROR = 500 + orange;
export const NOT_IMPLEMENTED = 501 + orange;
export const BAD_GATEAWAY = 502 + orange;
