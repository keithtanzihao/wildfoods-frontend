import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrClose, GrPrevious } from "react-icons/gr";

import styles from "../../styles/main.module.scss";

export default function Sidebar(props) {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [apiData, setApiData] = useState({
    categoryList: [],
    categoryData: [],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const categories = await axios.get(BASE_URL + "/category");
        setApiData({
          ...apiData,
          categoryList: categories.data,
        });
        console.log(categories.data);
      } catch (error) {
        console.log("sidebar useEffect problem");
      }
    };
    getData();
  }, []);

  const getProductFromCategory = async (categoryID, categoryIndex) => {
    let categoryProducts = await axios.get(
      BASE_URL + `/product/category_id/${categoryID}`
    );
    setApiData({
      ...apiData,
      categoryData: categoryProducts.data,
    });
    setSelectedCategory(categoryIndex);
  };

  const resetCategoryData = () => {
    setApiData({
      ...apiData,
      categoryData: [],
    });
    setSelectedCategory(-1);
  };

  const renderProductList = () => {
    let productList;
    if (apiData.categoryData.length !== 0) {
      productList = apiData.categoryData.map((product) => {
        return (
          <div className={`${styles["sidebar__ctn--product"]}`}>
            <div className={`${styles["sidebar__ctn--productInfo"]}`}>
              <h2>{product.title}</h2>
              <p>${(product.price / 100).toFixed(2)}</p>
            </div>
            <div className={`${styles["sidebar__ctn--productImg"]}`}>
              <img src={product.img_url} />
            </div>
          </div>
        );
      });
    }
    return (
      <div className={`${styles["sidebar__section--product"]}`}>
        <div className={`${styles["sidebar__ctn--icon"]}`}>
          <GrPrevious
            className={`${styles["icon__sidebar--back"]}`}
            onClick={resetCategoryData}
          />
        </div>
        <div className={`${styles["sidebar__ctn--content"]}`}>
          <h2>Products</h2>
          <ul>{productList}</ul>
        </div>
      </div>
    );
  };

  const renderSidebarLinks = () => {
    return apiData.categoryList.map((category, index) => {
      return (
        <li
          className={selectedCategory === index ? `${styles["selectedCategory"]}` : ""}
          onClick={() => getProductFromCategory(category.id, index)}
        >
          {category.title}
        </li>
      );
    });
  };

  return (
    <div className={`${styles["sidebar"]}`}>
      <div className={`${styles["sidebar__section--category"]}`}>
        <div className={`${styles["sidebar__ctn--icon"]}`}>
          <GrClose
            className={`${styles["icon__sidebar--close"]}`}
            onClick={props.updateIsSidebarOpen}
          />
        </div>

        <div className={`${styles["sidebar__ctn--content"]}`}>
          <h2>Categories</h2>
          <ul>
            <li>
              <Link to={"/products"}>All Products</Link>
            </li>
            {renderSidebarLinks()}
          </ul>
        </div>
      </div>

      {apiData.categoryData.length !== 0 && renderProductList()}

      <div
        className={`${styles["sidebar__section--empty"]}`}
        onClick={props.updateIsSidebarOpen}
      ></div>
    </div>
  );
}
