import styles from './TableFilter.module.css'
const TableFilter = (props) => {
    const isActive = (value) => {
        if(value === props.activeFilter)
        {
            return true
        }
        return false
    }
    const currentMonthClickHandler = () => {
        props.onFilterItems("currentMonth")
    }
    const currentYearClickHandler = () => {
        props.onFilterItems("currentYear")
    }
    const allClickHandler = () => {
        props.onFilterItems("all")
    }
    return (
        <div>
            <div className={styles.filterButtonGroup}>
                <button className= {`${styles.filterButton} ${isActive("currentMonth") && styles.active}`} onClick={currentMonthClickHandler}>Current Month</button>
                <button className={`${styles.filterButton} ${isActive("currentYear") && styles.active}`} onClick={currentYearClickHandler}>Current Year</button>
                <button className={`${styles.filterButton} ${isActive("all") && styles.active}`} onClick={allClickHandler}>All</button>
            </div>
        </div>
    )
}

export default TableFilter;