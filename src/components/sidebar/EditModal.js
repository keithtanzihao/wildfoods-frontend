import axios from "axios";
import React, { Fragment, useState, useContext } from "react";

import { TextInputValidate } from "../ui/Inputs";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

export default function EditModal(props) {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  const { product, quantity, user_id, product_id } = props.cartItem;

  const [editQuantity, setEditQuantity] = useState({
    quantity: 0,
  });

  const [errorMsg, setErrorMsg] = useState({
    quantity: "",
  });

  const submitEditQuantity = async (event) => {
    event.preventDefault();
    await axios.put(BASE_URL + `/cart/user/${user_id}/product/${product_id}/quantity/`, {
      quantity: editQuantity.quantity
    })
    props.setIsEditModalOpen(false);
  }

  const submitRemoveCartItem = async (event) => {
    event.preventDefault();
    await axios.delete(BASE_URL + `/cart/user/${user_id}/product/${product_id}/`);
    props.setIsEditModalOpen(false);
  }

  let properties = {
    name: "quantity",
    tableData: editQuantity,
    setTableData: setEditQuantity,
    errorMsg: errorMsg,
    setErrorMsg: setErrorMsg,
  };

  return (
    <Fragment>
      <div className={`${styles["editModal"]}`}>
        <div className={`${styles["editModal__ctn--cartInfo"]}`}>
          <h1>{product.title}</h1>
          <div>
            <p>Current Quantity: </p>
            <p>{quantity}</p>
          </div>
          <div>
            <TextInputValidate type="number" {...properties} />
            <Button
              content="Submit"
              className={`${styles["button__userSidebar"]}`}
              onClick={submitEditQuantity}
            />
            <Button
              content="Remove"
              className={`${styles["button__userSidebar"]}`}
              onClick={submitRemoveCartItem}
            />
            <Button
              content="Cancel"
              className={`${styles["button__userSidebar"]}`}
              onClick={props.updateIsEditModalOpen}
            />
          </div>
        </div>
        <img className={`${styles["editModal__ctn--img"]}`} src={product.img_url} />
      </div>

      <div
        className={`${styles["modal__empty"]}`}
        onClick={props.updateIsEditModalOpen}
      ></div>
    </Fragment>
  );
}
