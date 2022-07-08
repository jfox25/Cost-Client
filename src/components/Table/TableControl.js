import Table from "./Table";
import {useState} from 'react';
import TableFilter from "./TableFilter";
const TableControl = (props) => {
    const [activeColumn, setActiveColumn] = useState("Category");
    const [activeFilter, setActiveFilter] = useState("all");
    const sortItemHandler = (sortValue) => {
      setActiveColumn(sortValue)
    }
    const filterItemHandler = (fitlerValue) => {
      setActiveFilter(fitlerValue)
    }
    const filterItems = (fitlerValue, items) => {
      switch (fitlerValue) {
        case "all":
          return items;
        case "currentMonth":
          return items.filter((item) => new Date(item.Date).getMonth() === new Date().getMonth())
        case "currentYear":
          return items.filter((item) => new Date(item.Date).getFullYear() === new Date().getFullYear())
        default:
          return items
      }
    }
    const sortItems = (items, property) => {
        return items.sort(function(a,b){
            if ( a[property]< b[property]){
                return -1;
              }
              if ( a[property]> b[property] ){
                return 1;
              }
              return 0;
        })
      }

    return (
        <div>
          <TableFilter onFilterItems = {filterItemHandler} />
          <Table onItemsSort={sortItemHandler} items = {sortItems(filterItems(activeFilter, props.items), activeColumn)} columns = {props.columns} activeColumn = {activeColumn}/>
        </div>
    )
}

export default TableControl;