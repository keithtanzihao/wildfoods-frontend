import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

import { BASE_URL } from "../../helpers/helper";

export default function ProductPage() {
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(1);
  
  // Try to refactor this later if ive got time
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
        const product = await axios.request({
          url: BASE_URL + `/product/page/${pageNumber}`,
          method: "get",
          params: {
            ...filterData,
          },
        });
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


  // ---------------- Updates for sidebar ----------------
  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const updateIsUserSidebarOpen = () => {
    setUserSidebarOpen(!isUserSidebarOpen);
  }

  // ----------------------------------------------------------------
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
