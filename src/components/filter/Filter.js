import React, { Fragment, useState, useEffect } from "react";

import {
  SearchText,
  FilterRadio,
  CheckAvaliableStock,
  SortPrice,
} from "../filter/FilterItem";
import Button from "../ui/Button";

import styles from "../../styles/main.module.scss";

export default function Filter(props) {
  const { filterData, setFilterData } = props;

  return (
    <div className={`${styles["productIndex__filter"]}`}>
      <h5>Filter Options</h5>

      <SearchText
        name="title"
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <SortPrice
        label="Order Price"
        name="orderPrice"
        options={["Ascending", "Descending"]}
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <FilterRadio
        label="Nutrition"
        name="classification_id"
        apiUrl="/classification"
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <FilterRadio
        label="Category"
        name="category_id"
        apiUrl="/category"
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <CheckAvaliableStock
        label="Availability"
        name="isAvaliable"
        filterData={filterData}
        setFilterData={setFilterData}
      />

      <div>
        <Button
          className={`${styles["button__filter--add"]}`}
          content="Apply Filter"
          onClick={props.executeAddFilter}
        />
        <Button
          className={`${styles["button__filter--reset"]}`}
          content="Reset Filter"
          onClick={props.resetFilterData}
        />
      </div>
    </div>
  );
}
