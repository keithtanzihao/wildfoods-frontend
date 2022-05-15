import axios from "axios";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/auth-context";
import { GrClose, GrPrevious } from "react-icons/gr";

// import { BASE_URL } from "../../helpers/helper";

import EditModal from "./EditModal";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

export default function UserSidebar(props) {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  let authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const [userTokens, setUserTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalOpenData, setEditModalOpenData] = useState({});

  useEffect(() => {
    console.log(BASE_URL);
    const getData = async (userId) => {
      try {
        let decoded = jwt_decode(userTokens.accessToken);
        const cartData = await axios.get(BASE_URL + `/cart/user/${decoded.id}`);
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
    const stripeSession = await axios.get(BASE_URL + `/checkout/user/${decoded.id}`);
    window.location.href = stripeSession.data.stripeUrl;
  }

  const renderCartItems = () => {
    console.log(cartData);
    return cartData.map((cartItem) => {
      const { product, quantity } = cartItem;
      return (
        <li key={product.id} className={`${styles["sidebar__ctn--cartItem"]}`}>
          <div className={`${styles["sidebar__ctn--cartInfo"]}`}>
            <h5>{product.title}</h5>
            <div>
              <p>Quantity:</p>
              <p>{quantity}</p>
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
            <li>Orders</li>
            <li onClick={updateIsCartOpen}>Cart</li>

            {isCartOpen && (
              <ul className={`${styles["sidebar__ctn--cart"]}`}>
                {cartData && renderCartItems()}
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
