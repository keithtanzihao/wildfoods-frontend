import React from "react";

const SidebarContext = React.createContext({
  sidebarStaet: {},
  getSidebarState: () => {},
  updateIsSidebarOpen: () => {},
  updateIsUserSidebarOpen: () => {}
});

export default SidebarContext;