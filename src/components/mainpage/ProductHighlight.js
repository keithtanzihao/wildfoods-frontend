import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";
// A route for this later ?
// import almondImg from "../../styles/vendors/images/almond.webp";
// import handImg from "../../styles/vendors/images/hand.svg";

import { BASE_URL } from "../../helpers/helper";

export default function ProductHightlight() {

  const [hasLoaded, setHasLoaded] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await axios.get(
          BASE_URL + "/product/category_title/Tahinis"
        );
        setProductData(products.data);
      } catch (error) {
        console.log("productCarousel useEffect problem");
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

        <div className={`${styles["productHighligh__imgCtn"]}`}>
          {/* <img
            className={`${styles["productHighlight__img--almond"]}`}
            src={almondImg}
          />
          <img
            className={`${styles["productHighlight__img--hand"]}`}
            src={handImg}
          /> */}
        </div>
      </div>
    </div>
  );
}
