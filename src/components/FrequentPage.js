import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import AddFrequentForm from "./AddForms/AddFrequentForm";
import AddControl from "./Add/AddControl"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";

const FrequentPage = () => {
    const dateConvertor = (date, monthIncrementor = 0) => {
        const d = new Date(date);
        const year = d.getFullYear();
        let month = d.getMonth()+monthIncrementor + 1;
        let dt = d.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return (year+'-' + month + '-'+ dt);
    }
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const columns = [{name: "Business", sortable: true}, {name: "Category", sortable: true}, {name: "Is Recurring", sortable: true}, {name:"Last Used Date", sortable: true}, {name: "Next Bill Date", sortable: false}, {name: "Cost", sortable: false}]
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/frequents");
            const transformedFrequents = response.data?.map(frequent => { return {
                id : frequent.frequentId,
                Business : frequent.businessName,
                Category : frequent.categoryName,
                IsRecurring : (frequent.isRecurringExpense) ? "Yes" : "No",
                Date : dateConvertor(frequent.lastUsedDate),
                NextBillDate : (frequent.isRecurringExpense) ? dateConvertor(frequent.lastUsedDate, frequent.billedEvery) : "-",
                Cost : frequent.cost,
                } 
            })
            setItems(transformedFrequents)
        } catch (error) {
            setError(error.message);
            navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }
        setIsLoading(false)

    }
    useEffect(() => {
        fetchItemHandler();
    }, []);
    let content = <TableControl url="/frequents" addFilter={false} columns={columns} items={items} />;
    if(error) {
        content = <p>{error}</p>
    }
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <h1>Frequents</h1>
            {content}
            <AddControl content={<AddFrequentForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default FrequentPage;