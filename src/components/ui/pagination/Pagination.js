import React, { Fragment, useState, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

import Button from "../Button";

import styles from "../../../styles/main.module.scss";

export default function Pagination(props) {
  const renderPagination = () => {
    const { page, pageCount } = props.paginationData;
    return (
      <div className={`${styles["pagination__navigationCtn"]}`}>
        <h5>
          {page} / {pageCount}
        </h5>
      </div>
    );
  };

  return (
    <div className={`${styles["pagination"]}`}>
      <Button
        className={`${styles["button__pagination--left"]}`}
        onClick={() => props.changePageNumber(-1)}
      >
        <GrPrevious className={`${styles["icon__pagination--prev"]}`} />
      </Button>
      {renderPagination()}
      <Button
        className={`${styles["button__pagination--right"]}`}
        onClick={() => props.changePageNumber(1)}
      >
        <GrNext className={`${styles["icon__pagination--next"]}`} />
      </Button>
    </div>
  );
}
