import React from "react";

const SidebarContext = React.createContext({
  getSidebarState: () => {},
  updateSidebarState: () => {}
});

export default SidebarContext;