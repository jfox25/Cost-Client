import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const Demo = () => {
    const [expenses, setExpenses] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ "Location", "Category" , "Directive" , "Date", "Cost"]
    const fetchExpensesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/expenses', {
                headers: new Headers({
                    "Authorization" : ''
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()

            const transformedExpenses = data.map(expense => { return {
                id : expense.expenseId,
                Location : expense.locationName,
                Category : expense.categoryName,
                Directive : expense.directiveName,
                Date : expense.date,
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
    let content = <TableControl columns={columns} items={expenses} />;
    if(error) {
        content = <p>{error}</p>
    }
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <button onClick={fetchExpensesHandler}>Fetch Expenses</button>
            <h1>Expenses</h1>
            {content}
        </div>
    )
}

export default Demo;