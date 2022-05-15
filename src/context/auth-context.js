import React from "react";

const AuthContext = React.createContext({
  accessToken: "",
  refreshToken: "",
  getAuth: () => {},
  getEmail: () => {},
  resetAuth: () => {},
  updateTokens: (userData) => {}
});

export default AuthContext;