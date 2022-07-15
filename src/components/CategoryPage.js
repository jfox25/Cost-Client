import {useState, useEffect, useCallback} from "react"
import AddCatagoryForm from "./AddForms/AddCatagoryForm";
import TableControl from "./Table/TableControl"
import AddControl  from "./Add/AddControl";

const CategoryPage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const columns = [ {name:"Name", sortable: false}, {name:"Expense Count", sortable: true}, {name:"Total Cost", sortable: true}]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/categories', {
                headers: new Headers({
                    "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedItems = data.map(category => { return {
                    id : category.categoryId,
                    Name : category.name,
                    ExpenseCount : category.numberOfExpenses,
                    TotalCost : category.totalCostOfExpenses
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
            <h1>Categories</h1>
            {content}
            <AddControl content={<AddCatagoryForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default CategoryPage;