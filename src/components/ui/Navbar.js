import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/auth-context";

import styles from "../../styles/main.module.scss";
import logo from "../../styles/vendors/images/icons/wildSoulsIcon.svg";

export default function Navbar(props) {
  let authCtx = useContext(AuthContext);

  const renderLoginOrUser = () => {
    if (authCtx.authState.accessToken) {
      let decoded = jwt_decode(authCtx.authState.accessToken);
      return <li onClick={props.updateIsUserSidebarOpen}>{decoded.email}</li>
    } else {
      return <Link to={"/login"}>Login</Link>
    }
  }

  return (
    <Fragment>
      {authCtx.authState ?
        (
          <div className={`${styles["navbar"]}`}>
            <div className={`${styles["navbar__ctn--logo"]}`} >
              <Link to={"/"}>
                <img src={logo} />
                <h1>WildFoods</h1>
              </Link>
            </div>
            <div className={`${styles["navbar__ctn--link"]}`}>
              <li onClick={props.updateIsSidebarOpen}><p>Products</p></li>
              {/* <li><p>Build Your Gift</p></li>
              <li><p>The Store</p></li>
              <li><p>Recipies</p></li> */}
              {renderLoginOrUser()}
            </div>
          </div>
        ) :
        <div>Loading</div>
      }
    </Fragment>
  );
}
