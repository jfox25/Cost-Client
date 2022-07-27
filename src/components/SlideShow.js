import styles from "./SlideShow.module.css";
import { useState } from "react";
const UP_BUTTON = ">"
const DOWN_BUTTON = "<"
const SlideShow = ({slideValues}) => {
  const slideCount = slideValues.length - 1;
  const [currentSlideIndex , setCurrentSlideIndex] = useState(0);
  const buttonClickHandler = (e) => {
    if(e.target.innerText === UP_BUTTON)
    {
      (currentSlideIndex === slideCount) ? setCurrentSlideIndex(0) : setCurrentSlideIndex(currentSlideIndex + 1);
    }
    if(e.target.innerText === DOWN_BUTTON)
    {
      (currentSlideIndex === 0) ? setCurrentSlideIndex(slideCount) : setCurrentSlideIndex(currentSlideIndex - 1);
    }
  }
  return (
    <div className={styles.slideShow}>
      <p className={styles.content}>{slideValues[currentSlideIndex]}</p>
      <div className={styles.slideButtonGroup}>
        <button onClick={buttonClickHandler} className={styles.slideButton}>{DOWN_BUTTON}</button>
        <button onClick={buttonClickHandler} className={styles.slideButton}>{UP_BUTTON}</button>
      </div>
    </div>
  )
}

export default SlideShow