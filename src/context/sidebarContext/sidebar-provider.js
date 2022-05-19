import React, { useState } from "react";
import SidebarContext from "./sidebar-context";

// Will try to apply Sidebar Provider context to entire project's components
// if timem allows

const SidebarProvider = (props) => {
  const [sidebarState, setSidebarState] = useState({
    isSidebarOpen: false,
    isUserSidebarOpen: false,
  })

  const updateIsSidebarOpen = () => {
    console.log("updateissidebaropen");
    setSidebarState({
      ...sidebarState,
      isSidebarOpen: !sidebarState.isSidebarOpen
    })
  };

  const updateIsUserSidebarOpen = () => {
    console.log("updateUsersidebaropen");
    setSidebarState({
      ...sidebarState,
      isUserSidebarOpen: !sidebarState.isUserSidebarOpen
    })
  }

  const sidebarContext = {
    sidebarState: sidebarState,
    updateIsSidebarOpen: updateIsSidebarOpen,
    updateIsUserSidebarOpen: updateIsUserSidebarOpen
  }

  return (
    <SidebarContext.Provider value={sidebarContext}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider;