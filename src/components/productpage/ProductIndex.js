import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

import ProductItem from "./ProductItem";

import styles from "../../styles/main.module.scss";

export default function ProductIndex(props) {

  const renderProductData = () => {
    return props.productData.map((product) => {
      return <ProductItem key={product.title} type="product" product={product} />;
    });
  };

  return (
    <div className={`${styles["productIndex"]}`}>
      {renderProductData()}
    </div>
  );
}
