import React, { useState, useContext } from "react";
import SidebarContext from "../../context/sidebarContext/sidebar-context";

import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserSidebar from "../sidebar/UserSidebar";
import Jumbotron from "../ui/jumbotron/Jumbotron";
import CarouselContainer from "../ui/carousel/CarouselContainer";

import styles from "../../styles/main.module.scss";
import jumbotron__mainpage from "../../styles/vendors/images/jumbotron/jumbotron__mainpage.webp";

export default function Mainpage() {
  let sidebarCtx = useContext(SidebarContext);

  return (
    <main className={`${styles["mainpage"]}`}>
      {sidebarCtx.sidebarState.isSidebarOpen && (
        <Sidebar updateIsSidebarOpen={sidebarCtx.updateIsSidebarOpen} />
      )}
      {sidebarCtx.sidebarState.isUserSidebarOpen && (
        <UserSidebar
          updateIsUserSidebarOpen={sidebarCtx.updateIsUserSidebarOpen}
        />
      )}
      <header>
        <Navbar
          updateIsSidebarOpen={sidebarCtx.updateIsSidebarOpen}
          updateIsUserSidebarOpen={sidebarCtx.updateIsUserSidebarOpen}
        />
      </header>
      <section>
        <Jumbotron image={jumbotron__mainpage}/>
        <CarouselContainer/>
      </section>
    </main>
  );
}
