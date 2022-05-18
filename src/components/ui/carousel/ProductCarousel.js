import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";

import ProductItem from "../../productpage/ProductItem";
import Button from "../Button";

import styles from "../../../styles/main.module.scss";
import "react-multi-carousel/lib/styles.css";

import { BASE_URL } from "../../../helpers/helper";

export default function ProductCarousel(props) {

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

  const renderProductData = () => {
    return productData.map((product) => {
      return <ProductItem key={product.id} type="carousel" product={product} />;
    });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  if (hasLoaded) {
    return (
      <Fragment>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          keyBoardControl={true}
          autoPlay={false}
          shouldResetAutoplay={false}
        >
          {renderProductData()}
        </Carousel>
      </Fragment>
    );
  }
}
