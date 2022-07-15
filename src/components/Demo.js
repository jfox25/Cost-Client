import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const Demo = () => {
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
    const columns = [{name: "Business", sortable: true}, {name: "Category", sortable: true}, {name: "Directive", sortable: true}, {name: "Date", sortable: true}, {name: "Cost", sortable: false}]
    const fetchExpensesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/expenses', {
                headers: new Headers({
                    "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()

            const transformedExpenses = data.map(expense => { return {
                id : expense.expenseId,
                Business : expense.businessName,
                Category : expense.categoryName,
                Directive : expense.directiveName,
                Date : dateConvertor(expense.date),
                Cost : expense.cost,
                } 
            })
            
            setExpenses(transformedExpenses)
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false)

    }, [])
    useEffect(() => {
        fetchExpensesHandler();
    }, [fetchExpensesHandler]);
    let content = <TableControl columns={columns} items={expenses} addFilter={true} />;
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
        </div>
    )
}

export default Demo;