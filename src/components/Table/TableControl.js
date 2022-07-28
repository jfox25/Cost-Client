import Table from "./Table";
import {useState, useEffect, useRef} from 'react';
import TableFilter from "./TableFilter";
import TableSearch from "./TableSearch";
import styles from './TableControl.module.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import { AnimatePresence } from "framer-motion";
import LoadingIndicator from "../Extra/LoadingIndicator";
const ALL = "all";
const CURRENT_MONTH = "currentMonth";
const CURRENT_YEAR = "currentYear"
const TableControl = ({items, addFilter, url, columns, removeItem}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeColumn, setActiveColumn] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [searchTableValue, setSearchTableValue] = useState("");
  const [totalCostOfItems, setTotalCostOfItems] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buildDateString = (date) => {
    const year = date.substring(0, 4)
    const month = date.substring(5, 7)
    const day = date.substring(8,)
    return `${month}-${day}-${year}`
}
  const decipherError = (error) => {
    if(error.response.status === 404)
    {
      setError("Unable to connect with Server. Please try again.");
    }else if(error.response.status === 401)
    {
      navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
    }else if(error.response.data !== "") {
      setError(error.response?.data)
    }else {
      setError("Error Loading Resources")
    }
  }
  const prevActiveColumn = useRef();
  useEffect(() => {
    if(error || isloading) {
      setIsModalOpen(true);
    }else {
      setIsModalOpen(false);
    }
  }, [error, isloading])
  useEffect(() => {
    prevActiveColumn.current = activeColumn;
  }, [activeColumn]); 
  useEffect(() => {
    if(items.length > 0)
    {
      switch (activeFilter) {
        case ALL:
          setTotalCostOfItems(gettotalCostOfItems(items));
          break;
        case CURRENT_MONTH:
          const currentMonthItems = items.filter((item) => {
            const date = new Date(buildDateString(item.Date))
            if(date.getMonth() === new Date().getMonth()) return item
          }).filter((item) => {
            const date = new Date(buildDateString(item.Date))
            if(date.getFullYear() === new Date().getFullYear()) return item
          });
          if(currentMonthItems.length == 0) {
            setTotalCostOfItems(0);
          } else {
            setTotalCostOfItems(gettotalCostOfItems(currentMonthItems))
          }
          break;
        case CURRENT_YEAR:
          const currentYearItems = items.filter((item) => {
            const date = new Date(buildDateString(item.Date))
            if(date.getFullYear() === new Date().getFullYear()) return item
          });
          (currentYearItems.length === 0) ? setTotalCostOfItems(0) : setTotalCostOfItems(gettotalCostOfItems(currentYearItems));
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
      const number = filteredItems.reduce(function (acc, obj) { return acc + obj.Cost; }, 0);
      return Math.round(number * 100) / 100
    }else {
      return 0;
    }
  }
  const filterItems = (fitlerValue, filteredItems) => {
    switch (fitlerValue) {
      case ALL:
        return filteredItems;
      case CURRENT_MONTH:
        return filteredItems.filter((item) => {
          const date = new Date(buildDateString(item.Date))
          if(date.getMonth() === new Date().getMonth()) return item
        }).filter((item) => {
          const date = new Date(buildDateString(item.Date))
          if(date.getFullYear() === new Date().getFullYear()) return item
        });
      case CURRENT_YEAR:
        return filteredItems.filter((item) => {
          const date = new Date(buildDateString(item.Date))
          if(date.getFullYear() === new Date().getFullYear()) return item
        });
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
    const deleteItemHandler = async (id) => {
      await deleteItem(id);
    }
    const deleteItem = async (itemId) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await axiosPrivate.delete(`${url}/${itemId}`);
        removeItem(itemId);
      }
      catch(error) {
        decipherError(error);
      }
      finally {
        setIsLoading(false)
      }
    }
   
    let content = (
      <>
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
        onItemRowDelete = {deleteItemHandler}
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
      </>
    )
    let modalContent = <LoadingIndicator />
    if(error) {
      modalContent = (
        <div className={"errorModal"}>
        <h1>Error</h1>
        <hr />
        <p className={`errorDisplay`}>{error}</p>
       </div>
      )
    }
  return (
    <div>
      {content}
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
        {isModalOpen && <Modal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={modalContent}
                />}
        </AnimatePresence>
    </div>
  );
}

export default TableControl;