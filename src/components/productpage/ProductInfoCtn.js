import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import UserSidebar from "../sidebar/UserSidebar";
import DiscountHeader from "../ui/DiscountHeader";
import Navbar from "../ui/Navbar";

import styles from "../../styles/main.module.scss";

export default function ProductInfo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setUserSidebarOpen] = useState(false);

  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const updateIsUserSidebarOpen = () => {
    console.log("running ");
    setUserSidebarOpen(!isUserSidebarOpen);
  };

  return (
    <main>
      {isSidebarOpen && <Sidebar updateIsSidebarOpen={updateIsSidebarOpen} />}
      {isUserSidebarOpen && (
        <UserSidebar updateIsUserSidebarOpen={updateIsUserSidebarOpen} />
      )}

      <header>
        <DiscountHeader />
        <Navbar
          updateIsSidebarOpen={updateIsSidebarOpen}
          updateIsUserSidebarOpen={updateIsUserSidebarOpen}
        />
      </header>

      <section>
        <Outlet />
      </section>
    </main>
  );
}
