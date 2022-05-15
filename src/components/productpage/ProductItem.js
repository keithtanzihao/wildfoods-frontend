import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

export default function ProductItem(props) {

  let navigate = useNavigate();

  const [product, setProduct] = useState(props.product);

  const navigateToProductInfo = () => {
    navigate(`/product/${product.id}`);
  }


  return (
    <div key={product.title} className={`${styles[props.type + "Item"]}`}>

      <div className={`${styles[props.type + "Item__ctn--img"]}`}>
        <img src={product.bg_url} />
        <img src={product.img_url} />
      </div>

      <div className={`${styles[props.type + "Item__ctn--content"]}`}>
        <div>
          <h1>{product.title}</h1>
          <h5>${(product.price / 100).toFixed(2)}</h5>
        </div>
        <Button
          bgColor={product.color_theme}
          className={`${styles["button__product--buy"]}`}
          content="Buy Now !"
          onClick={navigateToProductInfo}
        />
      </div>

    </div>
  );
}
