import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import AddControl from './Add/AddControl'
import AddBusinessForm from "./AddForms/AddBusinessForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Leaderboard from "./Leaderboard/Leaderboard";
import  { useNavigate, useLocation } from "react-router-dom";

const BusinessPage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    
    const columns = [
      { name: "Name", sortable: false },
      { name: "Expense Count", sortable: true },
      { name: "Total Cost", sortable: true },
      { name: "Category", sortable: true },
      {name: "Tools", sortable: false}
    ];
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/business");
            const transformedItems = response.data?.map(business => { return {
                    id : business.businessId,
                    Name : business.name,
                    ExpenseCount : business.numberOfExpenses,
                    TotalCost : business.totalCostOfExpenses,
                    Category : (business.categoryName === null) ? "-" : business.categoryName
                }
            })
            setItems(transformedItems)
        } catch (error) {
            setError(error.message);
            navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchItemHandler();
    }, []);
    const removeItem = (id) => {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
    }
    let content = (
        <>
            <TableControl url="/business" columns={columns} items={items} removeItem={removeItem}/>
            <Leaderboard items={items}/>
        </>
    );
    if(error) {
        content = <p>{error}</p>
    }
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <h1>Businesses</h1>
            {content}
            <AddControl content={<AddBusinessForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default BusinessPage;