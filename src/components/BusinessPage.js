import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import AddControl from './Add/AddControl'
import AddBusinessForm from "./AddForms/AddBusinessForm";

const BusinessPage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ {name:"Name", sortable: false}, {name:"Expense Count", sortable: true}, {name:"Total Cost", sortable: true}, {name:"Category", sortable: true}]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/business', {
                headers: new Headers({
                    "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            console.log(data)
            const transformedItems = data.map(business => { return {
                    id : business.businessId,
                    Name : business.name,
                    ExpenseCount : business.numberOfExpenses,
                    TotalCost : business.totalCostOfExpenses,
                    Category : (business.categoryName === null) ? "-" : business.categoryName
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
            <h1>Businesses</h1>
            {content}
            <AddControl content={<AddBusinessForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default BusinessPage;