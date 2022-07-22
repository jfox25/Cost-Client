import Table from "./Table";
import {useState, useEffect, useRef} from 'react';
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import styles from './TableControl.module.css'
const TableControl = (props) => {
  const [activeColumn, setActiveColumn] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTableValue, setSearchTableValue] = useState("");
  const [totalCostOfItems, setTotalCostOfItems] = useState(0);
  const prevActiveColumn = useRef();
  useEffect(() => {
    prevActiveColumn.current = activeColumn;
  }, [activeColumn]); 
  useEffect(() => {
    if(props.items.length > 0)
    {
      switch (activeFilter) {
        case "all":
          const allItems = props.items;
          setTotalCostOfItems(gettotalCostOfItems(allItems));
          break;
        case "currentMonth":
          const currentMonthItems = props.items.filter((item) => new Date(item.Date).getMonth() === new Date().getMonth());
          setTotalCostOfItems(gettotalCostOfItems(currentMonthItems));
          break;
        case "currentYear":
          const currentYearItems = props.items.filter((item) => new Date(item.Date).getFullYear() === new Date().getFullYear());
          setTotalCostOfItems(gettotalCostOfItems(currentYearItems));
          break;
        default:
          setTotalCostOfItems(gettotalCostOfItems(props.items));
      }
    }
  }, [activeFilter, props.items])
  const sortItemHandler = (sortValue) => {
    const sortValueNoSpaces = sortValue.replace(/\s/g, "");
    if(sortValueNoSpaces === prevActiveColumn.current)
    {
      setActiveColumn("")
    }else {
      const sortValueNoSpaces = sortValue.replace(/\s/g, "");
      setActiveColumn(sortValueNoSpaces)
    }
  }
  const filterItemHandler = (fitlerValue) => {
    setActiveFilter(fitlerValue)
  }
  const tableSortHandler = (searchValue) => {
    setSearchTableValue(searchValue)
  }
  const gettotalCostOfItems = (items) => {
    if(items[0].hasOwnProperty("Cost"))
    {
      return items.reduce(function (acc, obj) { return acc + obj.Cost; }, 0);
    }else {
      return 0;
    }
  }
  const filterItems = (fitlerValue, items) => {
    switch (fitlerValue) {
      case "all":
        return items;
      case "currentMonth":
        return items.filter((item) => new Date(item.Date).getMonth() === new Date().getMonth());
      case "currentYear":
        return items.filter((item) => new Date(item.Date).getFullYear() === new Date().getFullYear());
      default:
        return items;
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
    const filterSearchItems = (items) => {
      if(searchTableValue !== ""){
        const result = items.filter((item) => {
            return Object.values(item).join(" ").toLowerCase().includes(searchTableValue.toLowerCase());
          })
          return result;
        } else {
          return items;
        }
    }
  return (
      <div>
        <div className={styles.filters}>
          <h3>Filters</h3>
          <div>
            {props.addFilter ? <TableFilter onFilterItems = {filterItemHandler} activeFilter = {activeFilter} /> : undefined}
            <TableSearch onTableSearch={tableSortHandler} />
          </div>
        </div>
        <Table url={props.url} totalCostOfItems={totalCostOfItems} searchValue={searchTableValue} onItemsSort={sortItemHandler} items = {sortItems(filterItems(activeFilter, filterSearchItems(props.items)), activeColumn)} columns = {props.columns} activeColumn = {activeColumn}/>
      </div>
  )
}

export default TableControl;