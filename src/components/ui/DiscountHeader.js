import React from "react";

import styles from "../../styles/main.module.scss";

export default function DiscountHeader(props) {
  return (
    <div className={`${styles["discountHeader"]}`}>
      <p>Free shipping in Singapore for Wild orders over $50</p>
    </div>
  )
}