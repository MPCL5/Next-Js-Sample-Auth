import Cookies from "js-cookie";
import { setAxiosToken } from "../api";

export const onLogin = (data) => {
  Cookies.set("token", data.token);
  setAxiosToken(data.token);
  console.log({ data });
};

export const onLogout = () => {
  Cookies.remove("token");
  setAxiosToken();
};
