const TableFilter = (props) => {
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
            <button onClick={currentMonthClickHandler}>Current Month</button>
            <button onClick={currentYearClickHandler}>Current Year</button>
            <button onClick={allClickHandler}>All</button>
        </div>
    )
}

export default TableFilter;