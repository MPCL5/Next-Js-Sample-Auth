import { setAxiosToken } from "../api/index";
import cookieToObject from "./cookieToObject";
import jwtDecode from "jwt-decode";

const handleSSAuth = function (ctx) {
  if (ctx.req.headers.cookie) {
    const token = cookieToObject(ctx.req.headers.cookie).token;

    try {
      const decoded = jwtDecode(token);
      if (+decoded.exp - Math.floor(Date.now() / 1000) <= 0) {
        return null;
      }

      setAxiosToken(token);
      return token;
    } catch {
      return null;
    }
  }

  return null;
};

export default handleSSAuth;
