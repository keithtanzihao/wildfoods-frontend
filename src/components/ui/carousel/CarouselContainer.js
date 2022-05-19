import React, { Fragment, useState, useEffect } from "react";

import ProductCarousel from "./ProductCarousel";

import styles from "../../../styles/main.module.scss";

// Will implement this in the future
export default function CarouselContainer() {
  return (
    <div className={`${styles["carouselCtn"]}`}>
      <div className={`${styles["carouselCtn__ctn--card"]}`}>
        <div className={`${styles["carouselCtn__ctn--title"]}`}>
          <h1>Wildly Loved</h1>
          <h5>
            You will find our wild products in their simplest form. No additives
            or anything else can spoil their nature
          </h5>
        </div>
        <div className={`${styles["carouselCtn__ctn--content"]}`}>
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
}
