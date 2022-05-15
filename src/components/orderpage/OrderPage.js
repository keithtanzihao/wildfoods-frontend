import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import DiscountHeader from "../ui/DiscountHeader";
import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserSidebar from "../sidebar/UserSidebar";
import PageHeader from "../ui/jumbotron/PageHeader";

import styles from "../../styles/main.module.scss";
import pageHeader__productpage from "../../styles/vendors/images/jumbotron/pageHeader__order.jpeg";

export default function OrderPage() {


  // Try to refactor this later if ive got time
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setUserSidebarOpen] = useState(false);

  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const updateIsUserSidebarOpen = () => {
    setUserSidebarOpen(!isUserSidebarOpen);
  }

  return (
    <main className={`${styles["productPage"]}`}>
      {isSidebarOpen && <Sidebar updateIsSidebarOpen={updateIsSidebarOpen} />}
      {isUserSidebarOpen && <UserSidebar updateIsUserSidebarOpen={updateIsUserSidebarOpen}/>}

      <header>
        <DiscountHeader />
        <Navbar 
          updateIsSidebarOpen={updateIsSidebarOpen} 
          updateIsUserSidebarOpen={updateIsUserSidebarOpen}
        />
      </header>

      <section>
        <PageHeader content="Orders" image={pageHeader__productpage} />

        
      </section>
    </main>
  )
}