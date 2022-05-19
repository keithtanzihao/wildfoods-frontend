import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { apiUrl, axiosApiUrl } from "../../utility/axios";

import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

// Will implement this in the future
export default function ProductHightlight() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axiosApiUrl.get(apiUrl.productCategoryTahini);
        setProductData(products.data);
      } catch (error) {
        console.log("producthighlights useEffect problem");
      }
    };
    getData();
    setHasLoaded(true);
  }, []);

  return (
    <div className={`${styles["productHighlight"]}`}>
      <div className={`${styles["productHighlight__ctn--head"]}`}>
        <h1>Wild like a</h1>
        <h1>Nut??</h1>
      </div>

      <div className={`${styles["productHighlight__ctn--content"]}`}>
        <div>
          <div className={`${styles["productHighlight__ctn--productHead"]}`}>
            <h1>Roasted</h1>
            <h1>Almond</h1>
          </div>
          <p className={`${styles["productHighlight__ctn--productDesc"]}`}>
            All the treasures are hidden in a chest. Respectively, our treasures
            are enclosed in their Wild shell.
          </p>
          <Button
            className={`${styles["button__mantra--discover"]}`}
            content="Discover More !"
          />
        </div>

        <div className={`${styles["productHighligh__imgCtn"]}`}></div>
      </div>
    </div>
  );
}
