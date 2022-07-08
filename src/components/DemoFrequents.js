import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"

const DemoFrequents = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ "Location", "Category" , "Directive" , "LastBilledDate", "Cost"]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/frequents', {
                headers: new Headers({
                    "Authorization" : ''
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()

            const transformedFrequents = data.map(frequent => { return {
                id : frequent.frequentId,
                Location : frequent.locationName,
                Category : frequent.categoryName,
                Directive : frequent.directiveName,
                Date : frequent.lastBilledDate,
                Cost : frequent.cost,
                } 
            })
            setItems(transformedFrequents)
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
            <h1>Frequents</h1>
            {content}
        </div>
    )
}

export default DemoFrequents;