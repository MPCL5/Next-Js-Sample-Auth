import { createContext, useContext, useState } from "react";
import req, { setAxiosToken } from "../api";

let localDefaultState = {
  isAuthenticated: false,
  data: null,
  token: "",
};
const LOCAL_NAME = "auth_state";

if (typeof window !== "undefined") {
  const localState = localStorage.getItem(LOCAL_NAME);
  localDefaultState = JSON.parse(localState);

  if (localDefaultState && localDefaultState.isAuthenticated)
    setAxiosToken(localDefaultState.token);
}

const AuthContext = createContext({
  ...localDefaultState,
  onLogin: (token, data) => {},
  onLogout: () => {},
});

const AuthProvider = ({ onLogin, onLogout, children, defaultState }) => {
  const [values, setValue] = useState(
    defaultState
      ? { ...localDefaultState, ...defaultState }
      : { ...localDefaultState }
  );

  const handleLogin = (token, data) => {
    const result = {
      isAuthenticated: true,
      data,
      token,
    };
    setValue({ ...result });

    localStorage.setItem(LOCAL_NAME, JSON.stringify(result));

    onLogin({ token, data });
  };

  const handleLogout = () => {
    setValue({ ...localDefaultState });

    localStorage.clear(LOCAL_NAME);

    onLogout();
  };

  return (
    <AuthContext.Provider
      value={{ ...values, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  const login = async (username, password) => {
    try {
      const res = await req.post("/login", { username, password });
      const { token, user } = res.data.data;

      context.onLogin(token, user);
    } catch {}
  };

  const logOut = () => {
    // call logout api.
    context.onLogout();
  };

  return { ...context, login, logOut };
};

export { AuthProvider, useAuth };
