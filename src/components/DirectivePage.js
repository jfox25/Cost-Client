import {useState, useEffect, useCallback} from "react";
import TableControl from "./Table/TableControl";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";

const DirectivePage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const columns = [ {name:"Name", sortable: false}, {name:"Expense Count", sortable: true}, {name:"Total Cost", sortable: true}]
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/directives");
            const transformedItems = response.data?.map(directive => { return {
                    id : directive.directiveId,
                    Name : directive.name,
                    ExpenseCount : directive.numberOfExpenses,
                    TotalCost : directive.totalCostOfExpenses
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
    let content = <TableControl columns={columns} items={items} />;
    if(error) {
        content = <p>{error}</p>
    }
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <h1>Directives</h1>
            {content}
        </div>
    )
}

export default DirectivePage;