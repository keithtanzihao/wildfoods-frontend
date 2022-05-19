import axios from "axios";

export const apiUrl = {
  classification: "/classification",
  cart: "/cart",
  cartUser: "/cart/user/",
  category: "/category",
  checkoutUser: "/checkout/user/",
  orderUser: "/order/user/",
  productCategoryTahini: "/product/category_title/Tahinis",
  productPage: "/product/page/",
  productCategoryId: "/product/category_id/",
  userLogin: "/user/login",
  userRegister: "/user/register",
  userRefresh: "/user/refresh",
  userLogout: "/user/logout",
}

export const axiosApiUrl = axios.create({
  // For testing on local machine
  baseURL: "http://localhost:3001"
  // baseURL: "https://wildfoodsbackend.herokuapp.com"
})

export const axiosHeaderConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}