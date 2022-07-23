import Table from "./Table";
import {useState, useEffect, useRef} from 'react';
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import styles from './TableControl.module.css'
import PaginationControls from "./PaginationControls";
const ALL = "all";
const CURRENT_MONTH = "currentMonth";
const CURRENT_YEAR = "currentYear"
const TableControl = ({items, addFilter, url, columns}) => {
  const [activeColumn, setActiveColumn] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [searchTableValue, setSearchTableValue] = useState("");
  const [totalCostOfItems, setTotalCostOfItems] = useState(0);

  const prevActiveColumn = useRef();
  useEffect(() => {
    prevActiveColumn.current = activeColumn;
  }, [activeColumn]); 
  useEffect(() => {
    if(items.length > 0)
    {
      switch (activeFilter) {
        case ALL:
          const allItems = items;
          setTotalCostOfItems(gettotalCostOfItems(allItems));
          break;
        case CURRENT_MONTH:
          const currentMonthItems = items.filter((item) => new Date(item.Date).getMonth() === new Date().getMonth());
          setTotalCostOfItems(gettotalCostOfItems(currentMonthItems));
          break;
        case CURRENT_YEAR:
          const currentYearItems = items.filter((item) => new Date(item.Date).getFullYear() === new Date().getFullYear());
          setTotalCostOfItems(gettotalCostOfItems(currentYearItems));
          break;
        default:
          setTotalCostOfItems(gettotalCostOfItems(items));
      }
    }
  }, [activeFilter, items])
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
  const gettotalCostOfItems = (filteredItems) => {
    if(filteredItems[0].hasOwnProperty("Cost"))
    {
      return filteredItems.reduce(function (acc, obj) { return acc + obj.Cost; }, 0);
    }else {
      return 0;
    }
  }
  const filterItems = (fitlerValue, filteredItems) => {
    switch (fitlerValue) {
      case ALL:
        return filteredItems;
      case CURRENT_MONTH:
        return filteredItems.filter((item) => new Date(item.Date).getMonth() === new Date().getMonth());
      case CURRENT_YEAR:
        return filteredItems.filter((item) => new Date(item.Date).getFullYear() === new Date().getFullYear());
      default:
        return filteredItems;
    }
  }
    const sortItems = (filteredItems, property) => {
        return filteredItems.sort(function(a,b){
            if ( a[property]< b[property]){
                return -1;
              }
              if ( a[property]> b[property] ){
                return 1;
              }
              return 0;
        })
      }
    const filterSearchItems = (filteredItems) => {
      if(searchTableValue !== ""){
        const result = filteredItems.filter((item) => {
            return Object.values(item).join(" ").toLowerCase().includes(searchTableValue.toLowerCase());
          })
          return result;
        } else {
          return filteredItems;
        }
    }
  return (
    <div>
      <div className={styles.filters}>
        <h3>Filters</h3>
        <div>
          {addFilter ? (
            <TableFilter
              onFilterItems={filterItemHandler}
              activeFilter={activeFilter}
            />
          ) : undefined}
          <TableSearch onTableSearch={tableSortHandler} />
        </div>
      </div>
      <Table
        url={url}
        totalCostOfItems={totalCostOfItems}
        searchValue={searchTableValue}
        onItemsSort={sortItemHandler}
        displayItems={
          sortItems(
            filterItems(activeFilter, filterSearchItems(items)),
            activeColumn
          )
        }
        columns={columns}
        activeColumn={activeColumn}
      />
    </div>
  );
}

export default TableControl;