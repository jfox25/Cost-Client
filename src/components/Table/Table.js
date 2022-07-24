import TableGroup from "./TableGroup";
import TableHeading from "./TableHeading";
import styles from './Table.module.css';
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import Modal from "../Modal/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationControls from "./PaginationControls";
import { AnimatePresence } from "framer-motion";
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const Table= ({url, totalCostOfItems, searchValue, onItemsSort, displayItems, columns, activeColumn}) => {
    const axiosPrivate = useAxiosPrivate();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailItemId, setDetailItemId] = useState();
    const [detailItemPairs, setDetailItemPairs] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [refinedItems, setRefinedItems] = useState([]);
    const [itemsPerPage] = useState(10);

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
        try {
            const response = await axiosPrivate.get(`${url}/${itemId}`);
            const responseItems = Object.entries(response.data)
            setDetailItemPairs(responseItems);
        }
        catch(error) {
            console.error(error)
        }
    }
    const detailViewHandler = async (id) => {
        await fetchItem(id)
        setIsDetailModalOpen(true)
    }
    
    return (
        <>
        <table className={styles.table}>
            <thead>
                <TableHeading columns={columns} activeColumn={activeColumn} onColumnClick = {sortClickHandler} />
            </thead>
            <tbody>
                {newItemGroups.map((itemGroup, index) => {
                    if(activeColumn.includes("Date"))
                    {
                        const groupName = `${MONTHS[new Date(buildDateString(itemGroup[0].Date)).getMonth()]}, ${new Date(itemGroup[0].Date).getFullYear()}`;
                        return <TableGroup rowClickHandler={detailViewHandler} totalCostOfItems={totalCostOfItems} searchValue={searchValue} items = {itemGroup} groupName = {groupName} key={index} columns = {columns} activeColumn={activeColumn} /> 
                    }else {
                        return <TableGroup rowClickHandler={detailViewHandler}  totalCostOfItems={totalCostOfItems} searchValue={searchValue} items = {itemGroup} groupName = {itemGroup[0][activeColumn]} key={index} activeColumn={activeColumn} /> 
                    }
                    
                    })}
            </tbody>
        </table>
        <PaginationControls itemsPerPage={itemsPerPage} totalItems={displayItems.length} paginate={paginate} currentPage={currentPage} />
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
            {isDetailModalOpen && <Modal content={<ItemDetail itemPairs={detailItemPairs}/>} isModalOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}/>}
        </AnimatePresence>
        </>
    )
}

export default Table;