import TableGroup from "./TableGroup";
import TableHeading from "./TableHeading";
import styles from './Table.module.css';
const Table= (props) => {
    const buildDateString = (date) => {
        const year = date.substring(0, 4)
        const month = date.substring(5, 7)
        const day = date.substring(8,)
        return `${month}-${day}-${year}`
    }
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const sortClickHandler = (sortValue) => {
        props.onItemsSort(sortValue)
    }
    let newItemGroups = [];
    if(props.activeColumn.includes("Date"))
    {
        const modifiedItems = props.items.map((item) => { return {...item, Date : `${month[new Date(buildDateString(item.Date)).getMonth()]}, ${new Date(item.Date).getFullYear()}`}})
        const unique = [...new Map(modifiedItems.map((item) => [item.Date, item])).values()]
        newItemGroups = unique.map(item => props.items.filter(x => item.Date === `${month[new Date(buildDateString(x.Date)).getMonth()]}, ${new Date(x.Date).getFullYear()}`))
    }else {
        const unique = [...new Map(props.items.map((item) => [item[props.activeColumn], item])).values()]
        newItemGroups = unique.map(item => props.items.filter(x => item[props.activeColumn] === x[props.activeColumn]))
    }
    
    return (
        <table className={styles.table}>
            <thead>
                <TableHeading columns={props.columns} activeColumn={props.activeColumn} onColumnClick = {sortClickHandler} />
            </thead>
            <div>
                {newItemGroups.map((itemGroup, index) => {
                    if(props.activeColumn.includes("Date"))
                    {
                        const groupName = `${month[new Date(buildDateString(itemGroup[0].Date)).getMonth()]}, ${new Date(itemGroup[0].Date).getFullYear()}`;
                        return <TableGroup totalCostOfItems={props.totalCostOfItems} searchValue={props.searchValue} items = {itemGroup} groupName = {groupName} key={index} columns = {props.columns} activeColumn={props.activeColumn} /> 
                    }else {
                        return <TableGroup totalCostOfItems={props.totalCostOfItems} searchValue={props.searchValue} items = {itemGroup} groupName = {itemGroup[0][props.activeColumn]} key={index} activeColumn={props.activeColumn} /> 
                    }
                    
                    })}
            </div>
        </table>
    )
}

export default Table;