import axios from "axios";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import SidebarContext from "../../context/sidebarContext/sidebar-context";
import AuthContext from "../../context/auth-context";

import { BASE_URL } from "../../helpers/helper";

import DiscountHeader from "../ui/DiscountHeader";
import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserSidebar from "../sidebar/UserSidebar";
import PageHeader from "../ui/jumbotron/PageHeader";

import styles from "../../styles/main.module.scss";
import pageHeader__productpage from "../../styles/vendors/images/jumbotron/pageHeader__order.jpeg";

export default function OrderPage() {
  let sidebarCtx = useContext(SidebarContext);
  let authCtx = useContext(AuthContext);

  const [orderState, setOrderState] = useState([]);

  useEffect(() => {
    (async () => {
      if (authCtx.authState.accessToken) {
        try {
          let decoded = jwt_decode(authCtx.authState.accessToken);
          const orders = await axios.get(
            BASE_URL + `/order/user/${decoded.id}`
          );
          setOrderState(orders.data);
        } catch (error) {
          console.log("orderpage useeffect error");
        }
      }
    })();
  }, [authCtx.authState.accessToken]);

  const getTimeData = (order_date) => {
    let timeData = order_date.toLocaleString("en-US", {
      timeZone: "Asia/Singapore",
    });
    return timeData.slice(0, 19).split("T");
  };

  const renderOrders = () => {
    return orderState
      .slice(0)
      .reverse()
      .map((orderItem) => {
        const timeData = getTimeData(orderItem.order_date);
        return (
          <li>
            <p>{orderItem.product.title}</p>
            <img src={orderItem.product.img_url} />
            <div>
              <p>{timeData[0]}</p>
              <p>{timeData[1]}</p>
            </div>
            <p>{orderItem.order_ref}</p>

            <p>{orderItem.quantity}</p>
            <p>{orderItem.total_cost}</p>
            <p>{orderItem.status.title}</p>
          </li>
        );
      });
  };

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
        <PageHeader content="Orders" image={pageHeader__productpage} />

        <div className={`${styles["orderpage__ctn"]}`}>
          <ul className={`${styles["orderpage__columnCtn"]}`}>
            <li>Product</li>
            <li>Image</li>
            <li>Purchase Date</li>
            <li>Order Ref</li>

            <li>Quantity</li>
            <li>Cost</li>
            <li>Status</li>
          </ul>

          <ul className={`${styles["orderpage__dataCtn"]}`}>
            {renderOrders()}
          </ul>
        </div>
      </section>
    </main>
  );
}




// if (localStorage.getItem("token")) {
//   console.log("testing");
// } else {
//   console.log("not working")
// }