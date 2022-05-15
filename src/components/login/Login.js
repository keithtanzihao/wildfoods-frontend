import axios from "axios";
import React, { Fragment, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import PageHeader from "../ui/jumbotron/PageHeader";
import { TextInputValidate } from "../ui/Inputs";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";
import pageHeader__login from "../../styles/vendors/images/jumbotron/pageHeader__login.jpeg";

export default function Login() {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  let navigate = useNavigate();
  let authCtx = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderInputTags = () => {
    return (
      <Fragment>
        {Object.keys(loginData).map((key) => {
          let properties = {
            name: key,
            tableData: loginData,
            setTableData: setLoginData,
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,
          };
          if (key === "email") {
            return <TextInputValidate key={key} type="text" {...properties} />;
          }
          if (key === "password") {
            return (
              <TextInputValidate key={key} type="password" {...properties} />
            );
          }
        })}
      </Fragment>
    );
  };

  const loginUserHandler = async () => {
    let isValid = true;
    Object.keys(errorMsg).map((key) => {
      if (errorMsg[key] !== "Valid") isValid = false;
    });

    if (isValid) {
      let payload = await axios.post(BASE_URL + "/user/login", {
        ...loginData
      });
      const { email, ...tokens } = payload.data

      authCtx.updateTokens(tokens);
      localStorage.setItem("tokens", JSON.stringify(tokens));

      console.log("-------------------");
      // console.log(authCtx.getAuth());

      navigate("/products");
    } else {
      // Need to make sure the errors pop out
      console.log("loginUserHandler validation error");
    }
  }

  return (
    <main className={`${styles["loginPage"]}`}>
      {isSidebarOpen && <Sidebar updateIsSidebarOpen={updateIsSidebarOpen} />}

      <header>
        <Navbar updateIsSidebarOpen={updateIsSidebarOpen} />
      </header>

      <section>
        <PageHeader content="Login" image={pageHeader__login} />

        <div className={`${styles["loginPage__ctn"]}`}>

          <div className={`${styles["loginPage__ctn--content"]}`}>
            <div>
              <h1>Welcome Back !!</h1>
              {renderInputTags()}
              <Button
                className={`${styles["button__login"]}`}
                content="Login"
                onClick={loginUserHandler}
              />
            </div>

            <div>
              <p>Not a customer yet ? <Link to={"/register"}>Register here</Link></p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrZWl0aHRhbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIyNDYyMTcsImV4cCI6MTY1MjI0NzExN30.cM79qh5YaXRsxqQX3rG8JZepsIuBReZmEVG57DXWUZ8

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrZWl0aHRhbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIyNDYyMTcsImV4cCI6MTY1MjI0NzExN30.cM79qh5YaXRsxqQX3rG8JZepsIuBReZmEVG57DXWUZ8

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJrZWl0aHRhbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIyNDYyMTcsImV4cCI6MTY1MjMzMjYxN30.3NV4031wMBqcBrfGYOC59_Mn12oVjgPtvUKJnDWI2aA