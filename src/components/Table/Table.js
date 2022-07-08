import TableGroup from "./TableGroup";
import TableHeading from "./TableHeading";
const Table= (props) => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const sortClickHandler = (sortValue) => {
        props.onItemsSort(sortValue)
    }
    let newItemGroups = [];
    if(props.activeColumn.includes("Date"))
    {
        const modifiedItems = props.items.map((item) => { return {...item, Date : `${month[new Date(item.Date).getMonth()]}, ${new Date(item.Date).getFullYear()}`}})
        const unique = [...new Map(modifiedItems.map((item) => [item.Date, item])).values()]
        newItemGroups = unique.map(item => props.items.filter(x => item.Date === `${month[new Date(x.Date).getMonth()]}, ${new Date(x.Date).getFullYear()}`))
    }else {
        const unique = [...new Map(props.items.map((item) => [item[props.activeColumn], item])).values()]
        newItemGroups = unique.map(item => props.items.filter(x => item[props.activeColumn] === x[props.activeColumn]))
    }
    return (
        <div>x
            <TableHeading columns={props.columns} onColumnClick = {sortClickHandler} />
            {newItemGroups.map((itemGroup, index) => {
                if(props.activeColumn.includes("Date"))
                {
                    const groupName = `${month[new Date(itemGroup[0].Date).getMonth()]}, ${new Date(itemGroup[0].Date).getFullYear()}`;
                    return <TableGroup items = {itemGroup} groupName = {groupName} key={index} columns = {props.columns} /> 
                }else {
                    return <TableGroup items = {itemGroup} groupName = {itemGroup[0][props.activeColumn]} key={index} columns = {props.columns} /> 
                }
                
                })}
        </div>
    )
}

export default Table;