import GroupHeading from "./GroupHeading";
import TableRow from "./TableRow";
import styles from './TableGroup.module.css'

const TableGroup = (props) => {
    return (
        <>
            <GroupHeading totalCostOfItems={props.totalCostOfItems} items={props.items} groupName={props.groupName} activeColumn={props.activeColumn}/>
            {props.items.map((item) => (<TableRow onTableRowClick={props.rowClickHandler} item = {item} key={item.id} searchValue={props.searchValue}/>))}
        </>
    )
}

export default TableGroup;