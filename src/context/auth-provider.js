import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "./auth-context";

const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

const defaultAuthState = {
  accessToken: "",
  refreshToken: "",
}

const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(defaultAuthState);

  useEffect(() => {
    const userTokenObj = JSON.parse(localStorage.getItem("tokens"));
    // console.log(userTokenObj);
    if (userTokenObj.refreshToken) {
      updateTokens(userTokenObj);
    }
  }, [])

  const updateTokens = async (userData) => {
    // console.log(userData.refreshToken);

    console.log(" ----------------- testing 1")
    let decoded = jwt_decode(userData.refreshToken);

    if (decoded.iat < decoded.exp) {
      console.log(" ----------------- testing 2")
      let accessTokenResponse = await axios.post(BASE_URL + "/user/refresh", {
        refreshToken: userData.refreshToken
      })
      console.log(" ----------------- testing 3")

      setAuthState({
        accessToken: accessTokenResponse.data.accessToken,
        ...userData
      });
      console.log(" ----------------- testing 4")

      localStorage.setItem("tokens", JSON.stringify({
        accessToken: accessTokenResponse.data.accessToken,
        refreshToken: userData.refreshToken
      }))
      console.log(" ----------------- testing 5")
      console.log("fired");
    } else {
      // If expired just get the user to relogin 
      setAuthState(defaultAuthState);
      console.log("OH SHIT HERE WE GO AGAIN");
    }
  }

  const getAuth = () => {
    return authState;
  }

  const resetAuth = () => {
    localStorage.setItem("tokens", JSON.stringify({
      accessToken: "",
      refreshToken: ""
    }))
    setAuthState(defaultAuthState);
  }

  // Potential error here
  const getEmail = () => {
    let decoded = jwt_decode(authState.accessToken);
    return decoded.email;
  }

  const authContext = {
    getAuth: getAuth,
    getEmail: getEmail,
    resetAuth: resetAuth,
    updateTokens: updateTokens
  }

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;