import styles from './TableSearch.module.css'

const TableSearch = (props) => {
    const searchInputChangeHandler = (event) => {
        props.onTableSearch(event.target.value)
    }
    return (
        <div className={styles.tableSearch}>
            <label>Search : </label>
            <input onChange={searchInputChangeHandler} type="text" />
        </div>
    )
}

export default TableSearch;