import {useState, useEffect, useCallback} from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TableControl from "./Table/TableControl"
import AddExpenseForm from "./AddForms/AddExpenseForm"
import AddControl from "./Add/AddControl";
import  { useNavigate, useLocation } from "react-router-dom";

const ExpensePage = () => {
    const dateConvertor = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        let month = d.getMonth()+1;
        let dt = d.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return (year+'-' + month + '-'+ dt);
    }
    const [expenses, setExpenses] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = useAxiosPrivate();
    const columns = [{name: "Business", sortable: true}, {name: "Category", sortable: true}, {name: "Directive", sortable: true}, {name: "Date", sortable: true}, {name: "Cost", sortable: false}]
    const fetchExpensesHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/expenses");
            const transformedExpenses = response.data?.map(expense => { return {
                        id : expense.expenseId,
                        Business : expense.businessName,
                        Category : expense.categoryName,
                        Directive : expense.directiveName,
                        Date : dateConvertor(expense.date),
                        Cost : expense.cost,
                        } 
                    })
                    
            setExpenses(transformedExpenses)
        }
        catch (error) {
            setError(error.message);
            navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }
        setIsLoading(false)

    }
    useEffect(() => {
        fetchExpensesHandler();
    }, []);
    let content = <TableControl url="/expenses" columns={columns} items={expenses} addFilter={true} />;
    if(error) {
        content = <p>{error}</p>
    }
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <h1>Expenses</h1>
            {content}
            <AddControl content={<AddExpenseForm fetchItems={fetchExpensesHandler}/>}/>
        </div>
    )
}

export default ExpensePage;