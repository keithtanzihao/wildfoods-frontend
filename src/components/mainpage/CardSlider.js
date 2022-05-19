import React, { Fragment, useState, useEffect } from "react";

import styles from "../../styles/main.module.scss";

export default function CardSlider(props) {
  const [animationIndex, setAnimationIndex] = useState(0);

  const executeAnimations = () => {
    if (animationIndex === 2) {
      setAnimationIndex(0);
    } else {
      setAnimationIndex(animationIndex + 1);
    }
  };

  return (
    <div className={`${styles["cardSlider__ctn"]}`}>
      <img
        src={props.layer1Img}
        className={animationIndex === 2 
          ? `${styles["cardSlider__img--center"]}`
          : `${styles["cardSlider__img--left"]}`
        }
        onClick={executeAnimations}
      />
      <img
        src={props.layer2Img}
        className={animationIndex === 1 
          ? `${styles["cardSlider__img--center"]}`
          : animationIndex < 2 
          ? `${styles["cardSlider__img--right"]}`
          : `${styles["cardSlider__img--hidden"]}`
        }
        onClick={executeAnimations}
      />
      <img
        src={props.layer3Img}
        className={animationIndex < 1 
          ? `${styles["cardSlider__img--center"]}`
          : `${styles["cardSlider__img--hidden"]}`
        }
        onClick={executeAnimations}
      />
    </div>
  );
}
