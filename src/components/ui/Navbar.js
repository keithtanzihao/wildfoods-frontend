import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/auth-context";

import Button from "./Button";

import styles from "../../styles/main.module.scss";
import logo from "../../styles/vendors/images/icons/wildSoulsIcon.svg";

export default function Navbar(props) {
  let authCtx = useContext(AuthContext);

  const [userTokens, setUserTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });
  // const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // console.log("executed");
    setUserTokens(authCtx.getAuth());
  }, [authCtx.getAuth()]);


  const renderLoginOrUser = () => {

    // const userTokenObj = JSON.parse(userTokens);
    // return <h1>not working</h1>

    // console.log(userTokens.accessToken);

    try {
      if (userTokens.accessToken) {
        // console.log("crap");
        let decoded = jwt_decode(userTokens.accessToken);
        // console.log(decoded);
        return <li onClick={props.updateIsUserSidebarOpen}>{decoded.email}</li>

      } else {
        // console.log("ok wut");
        return <Link to={"/login"}>Login</Link>
      }
    } catch (e) {
      console.log("ggwp");
    }
  }

  const testLogout = () => {
    authCtx.resetAuth();
  }

  return (
    <div className={`${styles["navbar"]}`}>

      <div className={`${styles["navbar__ctn--logo"]}`} >
        <img src={logo} />
        <h1>WildFoods</h1>
      </div>

      {/* Change all li to just Link components later */}
      <div className={`${styles["navbar__ctn--link"]}`}>
        <li onClick={props.updateIsSidebarOpen}><p>Products</p></li>
        <li><p>Build Your Gift</p></li>
        <li><p>The Store</p></li>
        <li><p>Recipies</p></li>
        {/* <Link to={"/login"}>Login</Link> */}
        {renderLoginOrUser()}

        {/* {userTokens ? <h1>{authCtx.getEmail()}</h1> : <h2>omgalul</h2>} */}
        {/* <button onClick={testLogout}>testLogout</button> */}
      </div>

    </div>
  );

}
