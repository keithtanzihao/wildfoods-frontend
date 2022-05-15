import React from "react";

import styles from "../../../styles/main.module.scss";

export default function PageHeader(props) {
  return (
    <div className={`${styles["pageHeader"]}`}>
      <div className={`${styles["pageHeader__cardCtn"]}`}>
        <div className={`${styles["pageHeader__backdrop"]}`}></div>
        <img src={props.image} />
        <div className={`${styles["pageHeader__titleCtn"]}`}>
          <h1>{props.content}</h1>
        </div>
      </div>
    </div>
  );
}
