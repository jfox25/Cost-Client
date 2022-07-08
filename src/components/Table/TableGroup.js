import TableRow from "./TableRow";

const TableGroup = (props) => {
    return (
        <div>
            <h1>{props.groupName}</h1>
            {props.items.map((item) => (<TableRow item = {item} key={item.id} columns={props.columns}/>))}
        </div>
    )
}

export default TableGroup;