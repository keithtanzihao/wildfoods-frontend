import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { apiUrl, axiosApiUrl, axiosHeaderConfig } from "../../utility/axios";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/auth-context";
import { GrClose, GrPrevious } from "react-icons/gr";

import EditModal from "./EditModal";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

export default function UserSidebar(props) {
  let authCtx = useContext(AuthContext);

  const [cartData, setCartData] = useState([]);
  const [userTokens, setUserTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalOpenData, setEditModalOpenData] = useState({});

  useEffect(() => {
    const getData = async (userId) => {
      try {
        let decoded = jwt_decode(userTokens.accessToken);
        const cartData = await axiosApiUrl.get(
          `${apiUrl.cartUser}${decoded.id}`,
          axiosHeaderConfig(userTokens.accessToken)
        );
        setCartData(cartData.data);
      } catch (error) {
        console.log("usersidebar useEffect problem");
      }
    };
    setUserTokens(authCtx.getAuth());
    if (userTokens.accessToken) {
      getData();
    }
  }, [authCtx.getAuth(), userTokens, isEditModalOpen]);

  // Cart and modal state helper functions
  const updateIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateIsEditModalOpen = (cartItem) => {
    setEditModalOpenData(cartItem);
    setIsEditModalOpen(!isEditModalOpen);
  };

  // User logout just resets auth tokens to empty string
  const userLogout = () => {
    authCtx.resetAuth();
    props.updateIsUserSidebarOpen();
  };

  // Submit cart to order table
  const submitCart = async () => {
    let decoded = jwt_decode(userTokens.accessToken);
    const stripeSession = await axiosApiUrl.get(
      `${apiUrl.checkoutUser}${decoded.id}`,
      axiosHeaderConfig(decoded.id)
    );
    window.location.href = stripeSession.data.stripeUrl;
  };

  const getCartTotalCost = () => {
    let totalCost = 0;
    for (let cartItem of cartData) {
      totalCost += (cartItem.product.price / 100) * cartItem.quantity;
    }
    return totalCost.toFixed(2);
  };

  const renderCartItems = () => {
    return cartData.map((cartItem) => {
      const { product, quantity } = cartItem;
      return (
        <li key={product.id} className={`${styles["sidebar__ctn--cartItem"]}`}>
          <div className={`${styles["sidebar__ctn--cartInfo"]}`}>
            <h5>{product.title}</h5>
            <div>
              <div className={`${styles["sidebar__ctn--quantityCost"]}`}>
                <p>Quantity:</p>
                <p>{quantity}</p>
              </div>
              <div className={`${styles["sidebar__ctn--quantityCost"]}`}>
                <p>Cost:</p>
                <p>${(quantity * product.price) / 100}</p>
              </div>
            </div>
            <div>
              <Button
                content="Edit"
                className={`${styles["button__userSidebar--edit"]}`}
                onClick={() => updateIsEditModalOpen(cartItem)}
              />
            </div>
          </div>
          <img src={product.img_url} />
        </li>
      );
    });
  };

  return (
    <div className={`${styles["sidebar"]}`}>
      {isEditModalOpen && (
        <EditModal
          cartItem={editModalOpenData}
          updateIsEditModalOpen={updateIsEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
      <div className={`${styles["sidebar__section--user"]}`}>
        <div className={`${styles["sidebar__ctn--icon"]}`}>
          <GrClose
            className={`${styles["icon__sidebar--close"]}`}
            onClick={props.updateIsUserSidebarOpen}
          />
        </div>
        <div className={`${styles["sidebar__ctn--content"]}`}>
          {userTokens.accessToken && (
            <h2>{jwt_decode(userTokens.accessToken).email}</h2>
          )}
          <ul>
            <li onClick={userLogout}>Logout</li>
            <li>
              <Link to={"/order"}>Orders</Link>
            </li>
            <li onClick={updateIsCartOpen}>Cart</li>
            {isCartOpen && (
              <ul className={`${styles["sidebar__ctn--cart"]}`}>
                {cartData && renderCartItems()}
                <div className={`${styles["sidebar__ctn--cartTotalCost"]}`}>
                  <h5>Total Cost:</h5>
                  <h5>${getCartTotalCost()}</h5>
                </div>
                {cartData.length !== 0 && (
                  <Button
                    content="Submit"
                    className={`${styles["button__userSidebar--submit"]}`}
                    onClick={submitCart}
                  />
                )}
              </ul>
            )}
          </ul>
        </div>
      </div>
      <div
        className={`${styles["sidebar__section--empty"]}`}
        onClick={props.updateIsUserSidebarOpen}
      ></div>
    </div>
  );
}
