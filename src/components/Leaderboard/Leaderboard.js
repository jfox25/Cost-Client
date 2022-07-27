import { useState, useEffect } from "react"
import styles from './Leaderboard.module.css'
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TOTAL_COST_PROPERTY = "TotalCost";
const TOTAL_NUMBER_PROPERTY= "ExpenseCount";
const NUMBER_OF_RANK_ITEMS = 5;
const Leaderboard = ({ items }) => {
    const [rankProperty, setRankProperty] = useState(TOTAL_COST_PROPERTY);
    const [topItems, setTopItems] = useState([]);
    useEffect(() => {
        const getTopItems = (items) => {
            items.sort((a, b) => a[rankProperty] < b[rankProperty] ? 1 : a[rankProperty] > b[rankProperty] ? -1 : 0);
            setTopItems(items.slice(0, NUMBER_OF_RANK_ITEMS))
        }
        getTopItems(items)
    }, [rankProperty])
    useEffect(() => {
    }, [topItems])
    const buttonClickHandler = () => {
        if(rankProperty === TOTAL_COST_PROPERTY){
            setRankProperty(TOTAL_NUMBER_PROPERTY);
        }else {
            setRankProperty(TOTAL_COST_PROPERTY);
        }
    }
  return (
    <div>
      <div className={styles.rankPropertyControl}>
      <div className={styles.leaderboardHeading}>
        <FontAwesomeIcon icon={faTrophy} className={styles.leaderboardIcon} />
        <h2>Leaderboard</h2>
      </div>
        <div className={styles.buttonGroup}>
        <p>Rank By: </p>
          {rankProperty === TOTAL_COST_PROPERTY ? (
            <button disabled className={styles.active}>
              Total Cost
            </button>
          ) : (
            <button onClick={buttonClickHandler} className={styles.button}>Total Cost</button>
          )}
          {rankProperty === TOTAL_NUMBER_PROPERTY ? (
            <button disabled className={`${styles.activeBlue}`}>
              Total Count
            </button>
          ) : (
            <button onClick={buttonClickHandler} className={styles.buttonBlue}>Total Count</button>
          )}
        </div>
      </div>
      
      <div className={styles.leaderboard}>
            {topItems.length !== 0 ? (
            topItems.map((item, index) => (
                <div key={index} className={styles.leaderboardItem}>
                    <p className={styles.leaderboardNumber}>{index + 1}</p>
                    <p className={styles.leaderboardValue}>{(item.hasOwnProperty("Name")) ? item.Name : item.Time}</p>
                    <p className={styles.rankProperty}> {(rankProperty === TOTAL_COST_PROPERTY) ? `$${item[rankProperty]}` : item[rankProperty]}</p>
                </div>
                ))): (
                <h3>No Items</h3>
            )}
      </div>
      </div>
      );
}

export default Leaderboard
     