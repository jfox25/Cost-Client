import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const DemoAnalytics = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ "Date", "ExpenseCount", "ToalCostofExpenses", "MostExpensiveLocation"]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/analytic/generalAnalytics', {
                headers: new Headers({
                    "Authorization" : ''
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            console.log(data);
            const transformedItems = data.map(item => { return {
                    id : item.generalAnalyticId,
                    Date : item.date,
                    ExpenseCount : item.numberOfExpenses,
                    ToalCostOfExpenses : item.totalCostOfExpenses,
                    MostExpensiveLocation : item.locationName
                }
            })
            console.log(transformedItems)
            setItems(transformedItems)
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false)

    }, [])
    useEffect(() => {
        fetchItemHandler();
    }, [fetchItemHandler]);
    let content = <TableControl columns={columns} items={items} />;
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

export default DemoAnalytics;