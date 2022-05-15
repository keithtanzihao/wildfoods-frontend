import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

import { TextInput, RadioInput, SelectOptionInput } from "../ui/Inputs";

import styles from "../../styles/main.module.scss";

const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

function FilterRadio(props) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [radioList, setRadioList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(BASE_URL + props.apiUrl);
        setRadioList(() => {
          return response.data.map((data) => {
            return data.title;
          });
        });
      } catch (error) {
        console.log("filterRadio useEffect problem");
      }
    };
    getData();
    setHasLoaded(true);
  }, []);


  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  }

  const properties = {
    name: props.name,
    radioList: radioList,
    tableData: props.filterData,
    setTableData: props.setFilterData,
  };

  if (hasLoaded) {
    return (
      <div className={`${styles["filterRadio__ctn"]}`}>
        <div className={`${styles["filterRadio__headerCtn"]}`} onClick={toggleIsOpened}>
          <h1>{props.label}</h1>
        </div>
        {isOpened && <RadioInput {...properties} />}
      </div>
    );
  }
}




function SortPrice(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [optionList, setOptionList] = useState(props.options);

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  }

  const properties = {
    name: props.name,
    optionList: optionList,
    tableData: props.filterData,
    setTableData: props.setFilterData,
  };

  return (
    <div className={`${styles["sortPrice__ctn"]}`}>
      <div className={`${styles["sortPrice__headerCtn"]}`} onClick={toggleIsOpened}>
        <h2>{props.label}</h2>
      </div>
      {isOpened && <SelectOptionInput {...properties} />}
    </div>
  );
}




function CheckAvaliableStock(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [radioList, setRadioList] = useState(["All Products", "In stock", "Out of stock"]);

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  }

  const properties = {
    name: props.name,
    radioList: radioList,
    tableData: props.filterData,
    setTableData: props.setFilterData,
  };

  return (
    <div className={`${styles["filterRadio__ctn"]}`}>
      <div className={`${styles["filterRadio__headerCtn"]}`} onClick={toggleIsOpened}>
        <h1>{props.label}</h1>
      </div>
      {isOpened && <RadioInput {...properties} />}
    </div>
  );
}








function SearchText(props) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  }

  const properties = {
    name: props.name,
    tableData: props.filterData,
    setTableData: props.setFilterData,
  };

  return (
    <div className={`${styles["searchText__ctn"]}`}>
      <div className={`${styles["searchText__headerCtn"]}`} onClick={toggleIsOpened}>
        <h1>Search Products</h1>
      </div>
      {isOpened && <TextInput {...properties} />}
    </div>
  );

}




export {
  FilterRadio,
  SearchText,
  CheckAvaliableStock,
  SortPrice
};
