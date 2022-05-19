import React, { Fragment, useState, useEffect } from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";

import Button from "../Button";

import styles from "../../../styles/main.module.scss";

export default function CartAmountButton(props) {

  const updateAmount = (event) => {
    props.updateCartQuantity(parseInt(event.target.value));
  };

  const addAmount = () => {
    props.updateCartQuantity(props.cartQuantity + 1);
  }

  const minusAmount = () => {
    if (!(props.cartQuantity <= 1)) {
      props.updateCartQuantity(props.cartQuantity - 1);
    }
  }

  return (
    <div className={`${styles["cartAmountButton"]}`}>
      <div className={`${styles["button__amountCtn"]}`}>
        <Button
          className={`${styles["button__amount--add"]}`}
          onClick={addAmount}
        >
          <GrAdd className={`${styles["icon__cartAmountButton--add"]}`} />
        </Button>
        <div>
          <input
          type="number"
          min={1}
          // Temp default for now. Refactor later
          max={props.stock ? props.stock : 1000}
          value={props.cartQuantity}
          onChange={updateAmount}
        />
        </div>
        <Button
          className={`${styles["button__amount--minus"]}`}
          onClick={minusAmount}
        >
          <GrSubtract className={`${styles["icon__cartAmountButton--minus"]}`} />
        </Button>
      </div>
    </div>
  );
}
