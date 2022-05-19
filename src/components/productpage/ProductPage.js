import React, { useContext, useState, useEffect } from "react";
import { apiUrl, axiosApiUrl } from "../../utility/axios";
import SidebarContext from "../../context/sidebarContext/sidebar-context";

import DiscountHeader from "../ui/DiscountHeader";
import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserSidebar from "../sidebar/UserSidebar";
import PageHeader from "../ui/jumbotron/PageHeader";

import Filter from "../filter/Filter";
import ProductIndex from "./ProductIndex";
import Pagination from "../ui/pagination/Pagination";

import styles from "../../styles/main.module.scss";
import pageHeader__productpage from "../../styles/vendors/images/jumbotron/pageHeader__productPage.jpeg";

export default function ProductPage() {
  let sidebarCtx = useContext(SidebarContext);

  const [pageNumber, setPageNumber] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setUserSidebarOpen] = useState(false);
  const [addFilter, setAddFilter] = useState(-1);
  const [apiData, setApiData] = useState({
    productData: [],
    paginationData: {},
  });
  const [filterData, setFilterData] = useState({
    title: "",
    classification_id: 0,
    category_id: 0,
    isAvaliable: 0,
    orderPrice: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const product = await axiosApiUrl.get(`${apiUrl.productPage}${pageNumber}`, {
          params: {
            ...filterData
          }
        })
        setApiData({
          ...apiData,
          productData: product.data.product,
          paginationData: product.data.pagination,
        });
      } catch (error) {
        console.log("productIndex useEffect problem");
      }
    };
    getData();
  }, [addFilter, pageNumber]);

  const changePageNumber = (number) => {
    setPageNumber(pageNumber + number);
  };

  const executeAddFilter = () => {
    setAddFilter(addFilter * -1);
  }

  const resetFilterData = () => {
    setFilterData({
      title: "",
      classification_id: 0,
      category_id: 0,
      isAvaliable: 0,
      orderPrice: "",
    })
  }  

  return (
    <main className={`${styles["productPage"]}`}>
      {sidebarCtx.sidebarState.isSidebarOpen && (
        <Sidebar updateIsSidebarOpen={sidebarCtx.updateIsSidebarOpen} />
      )}
      {sidebarCtx.sidebarState.isUserSidebarOpen && (
        <UserSidebar
          updateIsUserSidebarOpen={sidebarCtx.updateIsUserSidebarOpen}
        />
      )}
      <header>
        <DiscountHeader />
        <Navbar
          updateIsSidebarOpen={sidebarCtx.updateIsSidebarOpen}
          updateIsUserSidebarOpen={sidebarCtx.updateIsUserSidebarOpen}
        />
      </header>
      <section>
        <PageHeader content="All Products" image={pageHeader__productpage} />
        <div className={`${styles["productPage__ctn--content"]}`}>
          <Filter 
            filterData={filterData} 
            setFilterData={setFilterData} 
            resetFilterData={resetFilterData}
            executeAddFilter={executeAddFilter}
          />
          <div>
            <ProductIndex productData={apiData.productData} />
            <Pagination
              paginationData={apiData.paginationData}
              changePageNumber={changePageNumber}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
