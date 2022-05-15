import axios from "axios";
import React, { useState, Fragment, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import AuthContext from "../../context/auth-context";

import PageHeader from "../ui/jumbotron/PageHeader";
import Button from "../ui/Button";
import CartAmountButton from "../ui/button/CartAmountButton";

import styles from "../../styles/main.module.scss";

export default function ProductInfo() {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  const navigate = useNavigate();
  const location = useLocation();
  
  const authCtx = useContext(AuthContext);

  const [productData, setProductData] = useState({});
  const [cartQuantity, setQuantity] = useState(1);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [userTokens, setUserTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const product = await axios.get(BASE_URL + `${location.pathname}`);
        console.log(product.data);
        // Potential source of error
        setProductData(product.data[0]);
        setHasLoaded(true);
      } catch (error) {
        console.log("productInfo useEffect problem");
      }
    };

    setUserTokens(authCtx.getAuth());
    if (userTokens.accessToken) {
      getData();
    }

  }, [authCtx.getAuth(), userTokens]);


  const updateCartQuantity = (amount) => {
    setQuantity(amount)
  }


  const renderClassifications = () => {
    return productData.classification.map((classification) => {
      return <h5 key={classification.title}>{classification.title}</h5>;
    });
  };

  const renderIngredients = () => {
    return productData.productIngredient.map((ingredient) => {
      return <h5 key={ingredient.title}>{ingredient.title}</h5>;
    });
  };

  const addProductToCart = async (event) => {
    event.preventDefault();
    try {
      navigate("/products");
      await axios.post(BASE_URL + `/cart`, {
        user_id: jwt_decode(userTokens.accessToken).id,
        product_id: productData.id,
        quantity: cartQuantity
      })
      
    } catch(e) {
      console.log("Add Product To Cart Error");
    }
  }

  if (hasLoaded) {
    return (
      <Fragment>
        <PageHeader content={productData.title} image={productData.bg_url} />

        <div className={`${styles["productInfo"]}`}>
          <div className={`${styles["productInfo__ctn"]}`}>
            <div className={`${styles["productInfo__infoCtn"]}`}>
              <h4>{productData.category.title}</h4>
              <div>
                <div>{renderClassifications()}</div>
              </div>
              <div>
                <div>{renderIngredients()}</div>
              </div>
              <p>{productData.description}</p>

              <div className={`${styles["productInfo__costCtn"]}`}>
                <h1>${(productData.price / 100).toFixed(2)}</h1>

                <div>
                  <h5>{productData.stock > 0 ? "In Stock" : "No Stock"}</h5>
                </div>

                <div>
                  <h5>{productData.weight}g</h5>
                </div>

                <CartAmountButton 
                  stock={productData.stock} 
                  cartQuantity={cartQuantity} 
                  updateCartQuantity={updateCartQuantity} 
                />

                <Button
                  className={`${styles["button__productInfoAdd"]}`}
                  bgColor={productData.color_theme}
                  content="Add to Cart"
                  onClick={addProductToCart}
                />
              </div>

              <div className={`${styles["productInfo__nutritionCtn"]}`}>
                <div>
                  <h1>Nutrition Facts</h1>
                  <h1>Per 100g</h1>
                </div>

                <ul>
                  <li>
                    <div>
                      <p>Energy</p>
                      <p>{productData.energy}</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Fat</p>
                      <p>{productData.fat / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Of which saturates</p>
                      <p>{productData.saturated_fat / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Carbohydrates</p>
                      <p>{productData.carbohydrates / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Sugars</p>
                      <p>{productData.sugars / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Fibers</p>
                      <p>{productData.fiber / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Protein</p>
                      <p>{productData.protein / 100}g</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>Sodium</p>
                      <p>{productData.sodium / 100}g</p>
                    </div>
                  </li>
                </ul>

                <p>{productData.warning}</p>
              </div>
            </div>

            <div className={`${styles["productInfo__imgCtn"]}`}>
              <img src={productData.img_url} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
