import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthProvider from "./context/auth-provider";
import SidebarProvider from "./context/sidebarContext/sidebar-provider";

// Components
import Mainpage from "./components/mainpage/Mainpage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ProductPage from "./components/productpage/ProductPage";
import ProductInfoCtn from "./components/productpage/ProductInfoCtn";
import ProductInfo from "./components/productpage/ProductInfo";
import OrderPage from "./components/orderpage/OrderPage";
 
export default function App() {

  return (
    <AuthProvider>
      <SidebarProvider>
        <Routes>
          <Route path="" element={<Mainpage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="product/" element={<ProductInfoCtn />}>
            <Route path=":id" element={<ProductInfo />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />          
          <Route path="order" element={<OrderPage />} />
        </Routes>
      </SidebarProvider>
    </AuthProvider>
  );
}
