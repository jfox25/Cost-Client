import styles from "./ItemDetail.module.css"
import { useEffect, useState } from "react"
const ItemDetail = ({ itemPairs, title, id }) => {
    const [formatedTitle, setFormatedTitle] = useState("Loading");
    useEffect(() => {
        const updateTitleName = (string) => {
            if(string == "categories"){
                setFormatedTitle("Category");
            }else
            {
                let newTitle;
                if(title.slice(0, 1) !== 'b') {
                    newTitle = title.slice(0, -1);
                }else {
                    newTitle = title;
                }
                if(newTitle.includes("/")) {
                    const index = newTitle.indexOf("/") + 1;
                    const result = [newTitle.slice(0, index), newTitle.slice(index)];
                    setFormatedTitle(result[1]);
                }else {
                    setFormatedTitle(newTitle);
                }
            }
        }
        updateTitleName(title)
    }, [])
    const addSpacesToLabel = (string) => {
        return string.replace(/([A-Z])/g, ' $1').trim()
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <div>
        <h3 className={styles.title}>{`${capitalizeFirstLetter(formatedTitle)} #${id}`}</h3>
        <hr />
        <div className={styles.grid}>
          {itemPairs.map((item, index) => (
            <div className={styles.detailItem} key={index}>
              <p className={styles.itemKey}>{capitalizeFirstLetter(addSpacesToLabel(item[0]))} </p>
              <p className={styles.itemValue}>{(item[0].toLowerCase().includes("cost")) ?`$${item[1]}` :item[1]}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ItemDetail;