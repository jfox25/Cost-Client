import {useState, useEffect, useCallback} from "react"
import AddCatagoryForm from "./AddForms/AddCatagoryForm";
import TableControl from "./Table/TableControl"
import AddControl  from "./Add/AddControl";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Leaderboard from "./Leaderboard/Leaderboard";
import  { useNavigate, useLocation } from "react-router-dom";

const CategoryPage = () => {
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
      { name: "Tools", sortable: false },
    ];
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/categories");
            const transformedItems = response.data?.map(category => { return {
                    id : category.categoryId,
                    Name : category.name,
                    ExpenseCount : category.numberOfExpenses,
                    TotalCost : category.totalCostOfExpenses
                }
            })
            setItems(transformedItems)
        } catch (error) {
            setError(error.message);
            navigate('/login', { state : {from: location}, message: "Session has expired", replace : true});
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
            <TableControl url="/categories" columns={columns} items={items} removeItem={removeItem}/>
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
            <h1>Categories</h1>
            {content}
            <AddControl content={<AddCatagoryForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default CategoryPage;