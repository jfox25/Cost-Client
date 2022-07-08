import {useState} from "react"

const Demo = () => {
    const [expenses, setExpenses] = useState([]);
    const fetchExpenses = () => {
        fetch('https://localhost:5001/api/expenses', {
            headers: new Headers({
                "Authorization" : ''
            })
        }).then(response => {
             return response.json();
        }).then(data => {
            console.log(data);
            const transformedExpenses = data.map(expense => { return {
                id : expense.expenseId,
                Location : expense.locationName,
                Category : expense.categoryName,
                Directive : expense.directiveName,
                Date : expense.date,
                Cost : expense.cost,
                } 
            })
            setExpenses(transformedExpenses);
            console.log(expenses);
        })
    }
    return (
        <div>
            <button onClick={fetchExpenses}>Fetch Expenses</button>
            <h1>Expenses</h1>
        </div>
    )
}

export default Demo;