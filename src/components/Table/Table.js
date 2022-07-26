import TableGroup from "./TableGroup";
import TableHeading from "./TableHeading";
import styles from './Table.module.css';
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import Modal from "../Modal/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import PaginationControls from "./PaginationControls";
import { AnimatePresence } from "framer-motion";
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const Table= ({url, totalCostOfItems, searchValue, onItemsSort, displayItems, columns, activeColumn, onItemRowDelete}) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailItemPairs, setDetailItemPairs] = useState();
    const [detailItemId, setDetailItemId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [refinedItems, setRefinedItems] = useState([]);
    const [itemsPerPage] = useState(10);
    const [isloading, setIsLoading] = useState(false);
    const [detailShouldOpen, setDetailShouldOpen] = useState(false);
    const [error, setError] = useState(null);
    const decipherError = (error) => {
        console.log(typeof error)
        if(error.response.status === 404)
        {
          setError("Unable to connect with Server. Please try again.");
        }else if(error.response.status === 401)
        {
          navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }else if(error.response.data !== "" && typeof error.response.data !== "object") {
          setError(error.response?.data)
        }else {
          setError("Error Loading Resources")
        }
      }
    const makePages = (filteredItems) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const newCurrentDisplayItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
        return newCurrentDisplayItems;
      }
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        setRefinedItems(makePages(displayItems))
    }, [displayItems, currentPage])
    const buildDateString = (date) => {
        const year = date.substring(0, 4)
        const month = date.substring(5, 7)
        const day = date.substring(8,)
        return `${month}-${day}-${year}`
    }
    useEffect(() => {
        if(isloading || error || detailShouldOpen) {
          setIsModalOpen(true);
        }else {
          setIsModalOpen(false);
        }
      }, [isloading, error, detailShouldOpen])
    const sortClickHandler = (sortValue) => {
        onItemsSort(sortValue)
    }
    let newItemGroups = [];
    if(activeColumn.includes("Date"))
    {
        const modifiedItems = refinedItems.map((item) => { return {...item, Date : `${MONTHS[new Date(buildDateString(item.Date)).getMonth()]}, ${new Date(item.Date).getFullYear()}`}})
        const unique = [...new Map(modifiedItems.map((item) => [item.Date, item])).values()]
        newItemGroups = unique.map(item => refinedItems.filter(x => item.Date === `${MONTHS[new Date(buildDateString(x.Date)).getMonth()]}, ${new Date(x.Date).getFullYear()}`))
    }else {
        const unique = [...new Map(refinedItems.map((item) => [item[activeColumn], item])).values()]
        newItemGroups = unique.map(item => refinedItems.filter(x => item[activeColumn] === x[activeColumn]))
    }
    const fetchItem = async (itemId) => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await axiosPrivate.get(`${url}/${itemId}`);
            const responseItems = Object.entries(response.data)
            setDetailItemPairs(responseItems);
            setDetailItemId(itemId)
            setDetailShouldOpen(true)
        }
        catch(error) {
            decipherError(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    const detailViewHandler = async (id) => {
        await fetchItem(id)
    }
    let content = (
        <>
         <table className={styles.table}>
          <thead>
            <TableHeading
              columns={columns}
              activeColumn={activeColumn}
              onColumnClick={sortClickHandler}
            />
          </thead>
          <tbody>
            {newItemGroups.length === 0 ? (
              <tr className={styles.noItems}>
                <td>No Items Found</td>
              </tr>
            ) : (
              newItemGroups.map((itemGroup, index) => {
                if (activeColumn.includes("Date")) {
                  const groupName = `${
                    MONTHS[
                      new Date(buildDateString(itemGroup[0].Date)).getMonth()
                    ]
                  }, ${new Date(itemGroup[0].Date).getFullYear()}`;
                  return (
                    <TableGroup
                      deleteIsOn={columns[columns.length - 1].name === "Tools"}
                      onRowDelete={onItemRowDelete}
                      rowClickHandler={detailViewHandler}
                      totalCostOfItems={totalCostOfItems}
                      searchValue={searchValue}
                      items={itemGroup}
                      groupName={groupName}
                      key={index}
                      columns={columns}
                      activeColumn={activeColumn}
                    />
                  );
                } else {
                  return (
                    <TableGroup
                      deleteIsOn={columns[columns.length - 1].name === "Tools"}
                      onRowDelete={onItemRowDelete}
                      rowClickHandler={detailViewHandler}
                      totalCostOfItems={totalCostOfItems}
                      searchValue={searchValue}
                      items={itemGroup}
                      groupName={itemGroup[0][activeColumn]}
                      key={index}
                      activeColumn={activeColumn}
                    />
                  );
                }
              })
            )}
          </tbody>
        </table>
        {displayItems.length > itemsPerPage ? (
          <PaginationControls
            itemsPerPage={itemsPerPage}
            totalItems={displayItems.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : null}
        </>
    )
    let modalContent = (
        <ItemDetail
        title={url.substring(1)}
        id={detailItemId}
        itemPairs={detailItemPairs}
      />
    )
    if(isloading) {
        modalContent = (
            <div>
                <p> Loading ...</p>
            </div>
        )
    }
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
      <>
        {content}
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isModalOpen && (
            <Modal
              content={modalContent}
              isModalOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
}

export default Table;