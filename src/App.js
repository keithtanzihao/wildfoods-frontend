import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AuthProvider from "./context/auth-provider";

// Components
import Mainpage from "./components/mainpage/Mainpage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ProductPage from "./components/productpage/ProductPage";
import ProductInfoCtn from "./components/productpage/ProductInfoCtn";
import ProductInfo from "./components/productpage/ProductInfo";
import OrderPage from "./components/orderpage/OrderPage";

const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       let response = await axios.get(BASE_URL + "/admin/staff");
  //       setIsAuthenticated(response.data.isAuthenticated);
  //     } catch (error) {
  //       console.log("App useeffect error");
  //     }
  //   }
  //   getData();
  // })

  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Mainpage />} />
        <Route path="products" element={<ProductPage />} />

        <Route path="product/" element={<ProductInfoCtn/>}>
          <Route path=":id" element={<ProductInfo/>}/>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="order" element={<OrderPage />}/> 
      </Routes>
    </AuthProvider>
  );
}
