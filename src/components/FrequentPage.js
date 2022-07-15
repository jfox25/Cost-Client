import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import AddFrequentForm from "./AddForms/AddFrequentForm";
import AddControl from "./Add/AddControl"

const FrequentPage = () => {
    const dateConvertor = (date, monthIncrementor = 0) => {
        const d = new Date(date);
        const year = d.getFullYear();
        let month = d.getMonth()+monthIncrementor + 1;
        let dt = d.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return (year+'-' + month + '-'+ dt);
    }
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const columns = [{name: "Business", sortable: true}, {name: "Category", sortable: true}, {name: "Is Recurring", sortable: true}, {name:"Last Used Date", sortable: true}, {name: "Next Bill Date", sortable: false}, {name: "Cost", sortable: false}]
    const fetchItemHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://localhost:5001/api/frequents', {
                headers: new Headers({
                    "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
                })
            })
            if(!response.ok)
            {
                throw new Error('Something went wrong')
            }
            const data = await response.json();
            const transformedFrequents = data.map(frequent => { return {
                id : frequent.frequentId,
                Business : frequent.businessName,
                Category : frequent.categoryName,
                IsRecurring : (frequent.isRecurringExpense) ? "Yes" : "No",
                Date : dateConvertor(frequent.lastUsedDate),
                NextBillDate : (frequent.isRecurringExpense) ? dateConvertor(frequent.lastUsedDate, frequent.billedEvery) : "-",
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
    let content = <TableControl addFilter={false} columns={columns} items={items} />;
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
            <AddControl content={<AddFrequentForm fetchItems={fetchItemHandler}/>}/>
        </div>
    )
}

export default FrequentPage;