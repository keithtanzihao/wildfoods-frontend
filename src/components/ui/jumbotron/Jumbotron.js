import React from "react";

import Button from "../Button";

import styles from "../../../styles/main.module.scss";

export default function Jumbotron(props) {
  return (
    <div className={`${styles["jumbotron"]}`}>
      <div className={`${styles["jumbotron__cardCtn"]}`}>
        <img src={props.image} />
        <div className={`${styles["jumbotron__titleCtn"]}`}>
          <h1>Taste the Wild, Feel your Soul</h1>
          <Button
            className={`${styles["button__jumbotron--mainpage"]}`}
            content="Our Products"
          />
        </div>
      </div>
    </div>
  );
}
