import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import PageHeader from "../ui/jumbotron/PageHeader";
import { TextInputValidate } from "../ui/Inputs";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";
import pageHeader__register from "../../styles/vendors/images/jumbotron/pageHeader__register.jpeg";

export default function Register() {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  let navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderInputTags = () => {
    return (
      <Fragment>
        {Object.keys(registerData).map((key) => {
          let properties = {
            name: key,
            tableData: registerData,
            setTableData: setRegisterData,
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,
          };

          if (key === "password") {
            return <TextInputValidate key={key} type="password" {...properties} />
          } else {
            return <TextInputValidate key={key} type="text" {...properties} />;
          }

        })}
      </Fragment>
    );
  };

  const registerUserHandler = async () => {

    let isValid = true;
    Object.keys(errorMsg).map((key) => {
      if (errorMsg[key] !== "Valid") isValid = false;
    });

    if (isValid) {
      let payload = await axios.post(BASE_URL + "/user/register", { 
        ...registerData 
      });
      console.log(payload.data);
      navigate("/login");
    } else {
      // Need to make sure the errors pop out
      console.log("registerUserHandler validation error");
    }
  }

  return (
    <main className={`${styles["loginPage"]}`}>
      {isSidebarOpen && <Sidebar updateIsSidebarOpen={updateIsSidebarOpen} />}

      <header>
        <Navbar updateIsSidebarOpen={updateIsSidebarOpen} />
      </header>

      <section>
        <PageHeader content="Register" image={pageHeader__register} />

        <div className={`${styles["loginPage__ctn"]}`}>

          <div className={`${styles["loginPage__ctn--content"]}`}>
            <div>
              <h1>Hi There :)</h1>
              {renderInputTags()}
              <Button 
                className={`${styles["button__login"]}`} 
                content="Register" 
                onClick={registerUserHandler}
              />
            </div>

            <div>
              <p>Already a customer ? <Link to={"/login"}>Login here</Link></p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}
