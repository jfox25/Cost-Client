import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const DemoLocations = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ "Name", "ExpenseCount"]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/locations', {
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
            const transformedItems = data.map(location => { return {
                    id : location.locationId,
                    Name : location.name,
                    ExpenseCount : location.expenses.length
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
            <h1>Locations</h1>
            {content}
        </div>
    )
}

export default DemoLocations;