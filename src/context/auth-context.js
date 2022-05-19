import React from "react";

const AuthContext = React.createContext({
  authState: {},
  getAuth: () => {},
  resetAuth: () => {},
  checkAndUpdateTokens: (accessToken, refresToken) => {},
  userLogout: () => {},
});

export default AuthContext;