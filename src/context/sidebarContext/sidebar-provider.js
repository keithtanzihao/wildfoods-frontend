import SidebarContext from "./sidebar-context";

const SidebarProvider = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  return (
    <SidebarContext.Provider value={sidebarContext}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider;