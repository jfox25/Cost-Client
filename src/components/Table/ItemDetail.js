import styles from "./ItemDetail.module.css"
const ItemDetail = ({ itemPairs }) => {
    console.log(itemPairs[0][0])
    return (
        <div>
            <h1>Detail View</h1>
            <div className={styles.grid}>
            {itemPairs.map((item,index) => <div className={styles.detailItem} key={index}><p className={styles.itemKey}>{item[0]} : </p><p>{item[1]}</p></div>)}
            </div>
        </div>
    )
}

export default ItemDetail;