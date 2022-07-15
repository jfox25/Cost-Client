import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const DemoAnalytics = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const columns = [{name:"Month", sortable: false}, {name:"Expense Count", sortable: true}, {name:"Total Cost", sortable: true}, {name:"Top Location", sortable: true}]
    const fetchItemHandler = useCallback(async () => {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/analytic/generalAnalytics', {
                headers: new Headers({
                    "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedItems = data.map(item => { return {
                    id : item.generalAnalyticId,
                    Time :  `${month[new Date(item.date).getMonth()]}, ${new Date(item.date).getFullYear()}`,
                    ExpenseCount : item.numberOfExpenses,
                    TotalCost : item.totalCostOfExpenses,
                    TopLocation : item.locationName
                }
            })
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