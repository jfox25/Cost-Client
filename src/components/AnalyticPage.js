import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import Leaderboard from "./Leaderboard/Leaderboard";

const AnalyticPage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const columns = [
      { name: "Month", sortable: false },
      { name: "Expense Count", sortable: true },
      { name: "Total Cost", sortable: true },
      { name: "Top Business", sortable: true },
      {name: "Top Category", sortable: true },
    ];
    const fetchItemHandler = async () => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/analytic/generalAnalytics");
            const transformedItems = response.data?.map(item => { return {
                    id : item.generalAnalyticId,
                    Time :  `${month[new Date(item.date).getMonth()]}, ${new Date(item.date).getFullYear()}`,
                    ExpenseCount : item.numberOfExpenses,
                    TotalCost : item.totalCostOfExpenses,
                    TopBusiness : item.businessName,
                    TopCategory: item.categoryName,
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
    let content = (
        <>
            <TableControl url="/analytic/generalAnalytics" columns={columns} items={items} fetchItems={fetchItemHandler}/>
            <Leaderboard items={items} />
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
            <h1>General Analytics</h1>
            {content}
        </div>
    )
}

export default AnalyticPage;