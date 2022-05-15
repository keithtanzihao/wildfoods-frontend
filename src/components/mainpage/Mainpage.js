import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";

import Navbar from "../ui/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Jumbotron from "../ui/jumbotron/Jumbotron";
import CarouselContainer from "../ui/carousel/CarouselContainer";

import Button from "../ui/Button";
// import ProductCarousel from "./ProductCarousel";
import CardSlider from "./CardSlider";
import ProductHighlight from "./ProductHighlight";

import styles from "../../styles/main.module.scss";
import jumbotron__mainpage from "../../styles/vendors/images/jumbotron/jumbotron__mainpage.webp";

export default function Mainpage() {
  const BASE_URL = "https://wildfoodsbackend.herokuapp.com";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className={`${styles["mainpage"]}`}>

      {isSidebarOpen && <Sidebar updateIsSidebarOpen={updateIsSidebarOpen} />}

      <header>
        {/* <DiscountHeader /> */}
        <Navbar updateIsSidebarOpen={updateIsSidebarOpen} />
      </header>

      <section>
        <Jumbotron image={jumbotron__mainpage}/>
        <CarouselContainer/>


        {/* <div className={`${styles["mainpage__carousel"]}`}>
          <div className={`${styles["mainpage__ctn--carouselHead"]}`}>
            <div className={`${styles["mainpage__ctn--carouselBadge"]}`}>
              <img src={class_badge} />
              <img src={no_badge} />
            </div>
            <div className={`${styles["mainpage__ctn--carouselTitle"]}`}>
              <h1>Wildly Loved</h1>
              <p>
                You will find our wild products in their simplest form. No
                additives or anything else can spoil their nature
              </p>
            </div>
          </div>
          <div className={`${styles["mainpage__ctn--carouselProduct"]}`}>
            <ProductCarousel />
          </div>
        </div> */}

        {/* <div className={`${styles["mainpage__mantra"]}`}>
          <div className={`${styles["mainpage__ctn--mantraHead"]}`}>
            <div>
              <h1>Our</h1>
              <h1>Wild Way</h1>
            </div>
            <p>
              Our philosophy is present in every stage of our production. We are
              endeavoring to contribute to the creation of a better world.
            </p>
            <Button
              className={`${styles["button__mantra--discover"]}`}
              content="Discover More !"
            />
          </div>

          <div className={`${styles["mainpage__ctn--mantraImgs"]}`}>
            <CardSlider
              layer1Img={layer1Img}
              layer2Img={layer2Img}
              layer3Img={layer3Img}
            />
          </div>
        </div> */}

        {/* <div className={`${styles["mainpage__nuts"]}`}>
          <ProductHighlight />
          <div className={`${styles["mainpage__nuts--treasure"]}`}>
            <p>Discover our products through the 5 treasures of nature</p>
            <ul>
              <li>Sesame</li>
              <li>Peanut</li>
              <li>Almond</li>
              <li>Hazelnut</li>
              <li>Cashew</li>
            </ul>
          </div>
        </div> */}
      </section>
    </main>
  );
}
