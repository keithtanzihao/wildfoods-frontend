import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiUrl, axiosApiUrl, axiosHeaderConfig } from "../utility/axios.js"
import jwtDecode from "jwt-decode";
import AuthContext from "./auth-context";

const defaultAuthState = {
  accessToken: "",
  refreshToken: "",
};

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState(defaultAuthState);

  useEffect(() => {
    runEffect();

  }, []);

  const runEffect = async () => {
    const { accessToken, refreshToken } = JSON.parse(localStorage.getItem("tokens"));
    await checkAndUpdateTokens(accessToken, refreshToken);
  }


  const hasTokenExpired = (token) => {
    console.log(`Current Date: ${Date.now()}`);
    console.log(`Token EXP: ${jwtDecode(token).exp * 1000}`);
    return Date.now() >= jwtDecode(token).exp * 1000;
  };


  const setDefaultStateCookie = () => {
    setAuthState(defaultAuthState);
    localStorage.setItem("tokens", JSON.stringify(defaultAuthState));
  }


  const setStateCookie = (newAccessToken, newRefreshToken) => {
    setAuthState({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    })
    localStorage.setItem("tokens", JSON.stringify({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }))
  }


  const checkAndUpdateTokens = async (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
      // Both accessTokens, refreshTokens exist in cookie
      if (hasTokenExpired(refreshToken)) {
        // Refresh Token has expired, re-direct to login
        setDefaultStateCookie();
        navigate("/login");
      } else {
        // Refresh Token has not expired
        if (hasTokenExpired(accessToken)) {
          // If access token has expired get new access token
          const tokenResponse = await axiosApiUrl.post(apiUrl.userRefresh, {
            refreshToken: refreshToken,
          });
          // If refresh token isnt blacklisted & returns new access token
          if (tokenResponse?.data) {
            setStateCookie(tokenResponse.data.accessToken, refreshToken);
          } else {
            // Check if refresh Token is blacklisted, re-direct to login
            setDefaultStateCookie();
            navigate("/login");
          }
        } else {
          // Both accessToken, refreshTokens are ok
          setStateCookie(accessToken, refreshToken);
        }
      }
    } else {
      // If tokens dont exist in the first place, set default state, request new login
      setDefaultStateCookie();
      navigate("/login");
    }
  };


  const userLogout = async () => {
    const userTokenObj = JSON.parse(localStorage.getItem("tokens"));
    if (userTokenObj) {
      await axiosApiUrl.post(apiUrl.userLogout, {
        refreshToken: userTokenObj.refreshToken,
      })
      setDefaultStateCookie();
    }
  }


  // Need to refactor this area
  const getAuth = () => {
    return authState;
  };


  const resetAuth = () => {
    localStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken: "",
        refreshToken: "",
      })
    );
    setAuthState(defaultAuthState);
  };


  const authContext = {
    authState: authState,
    getAuth: getAuth,
    resetAuth: resetAuth,
    checkAndUpdateTokens: checkAndUpdateTokens,
    userLogout, userLogout
  };

  
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
