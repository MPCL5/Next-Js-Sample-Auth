import axios from "axios";

const defaultAxios = axios.create({
  baseURL: "http://localhost",
});

const setAxiosToken = (token) => {
  if (!!token) {
    defaultAxios.defaults.headers["Authorization"] = "Bearer " + token;
  } else {
    defaultAxios.defaults.headers["Authorization"] = undefined;
  }
  console.log({ header: defaultAxios.defaults.headers, token });
};

export default defaultAxios;
export { setAxiosToken };
