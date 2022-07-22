import React, {useRef, useState, useCallback, useEffect} from 'react'
import styles from './Forms.module.css'
import RequiredSelectInput from './RequiredSelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
export default function AddFrequentForm({ onClose, fetchItems }) {
    const axiosPrivate = useAxiosPrivate();
    const directives = [{directiveId: 1, name: "Overhead"}, {directiveId: 2, name: "Investment"}, {directiveId: 3, name: "Discretionary"}]
    const [catagories, setCatagories] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);
    const[catagoryId, setCatagoryId] = useState(0);
    const[businessId, setBusinessId] = useState(0);
    const nameRef = useRef('')
    const costRef = useRef(0)
    const directiveRef = useRef()
    const billedEveryRef = useRef()
    const lastUsedDateRef = useRef()
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const submitHandler = (event) => {
        event.preventDefault();
        if(businessId === 0 || catagoryId === 0)
        {
            alert("error please fill in all required fields")
        }
        else {
            const frequent = {
                name : nameRef.current.value,
                categoryId : parseInt(catagoryId),
                businessId : parseInt(businessId),
                directiveId: parseInt(directiveRef.current.value),
                isRecurringExpense : isRecurring,
                cost : parseInt(costRef.current.value)
                // billedEvery : (isRecurring)? billedEveryRef : null,
                // lastUsedDate : (isRecurring)? lastUsedDateRef : null,
            }
            console.log(frequent)
            postFrequent(frequent);
        }
    }
    const postFrequent = async (frequent) => {
        try {
            const response = await axiosPrivate.post("/frequents",
                JSON.stringify(frequent ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchItems();
            onClose();
        }
        catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const fetchCatagoriesHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/categories");
                
                const transformedItems = response.data?.map(category => { return {
                        id : category.categoryId,
                        Name : category.name,
                    }
                })
                setCatagories(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        const fetchBusinessHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/business");
                const transformedItems = response.data?.map(business => { return {
                        id : business.businessId,
                        Name : business.name,
                    }
                })
                setBusinesses(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        fetchCatagoriesHandler();
        fetchBusinessHandler();
    }, []);
    const onCatagorySelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            console.log(value.id)
            setCatagoryId(value.id)
        }
    }
    const onBusinessSelectInputSubmitHandler = (value) => {
        console.log(value)
        if(value.name !== "")
        {
            setBusinessId(value.id)
        }
    }
    // let content = <h2>Add a Business</h2>;
    // if(error) {
    //     content = <p>{error}</p>
    // }
    // if(isloading) {
    //     content = <p>Loading ...</p>
    // }
  return (
    <>
    <h2>Add a Frequent</h2>
    <form className={styles.form} onSubmit={submitHandler}>
        <div>
            <label htmlFor='name'>Name</label>
            <input id='name' type="text" ref={nameRef} required/>
        </div>
        <RequiredSelectInput isRequired={true} onSubmit={onCatagorySelectInputSubmitHandler} label={"Category"} items={catagories} />
        <RequiredSelectInput isRequired={true} onSubmit={onBusinessSelectInputSubmitHandler} label={"Business"} items={businesses} />
        <div>
            <label htmlFor='directive'>Directive</label>
            <select id='directive' ref={directiveRef}>{directives.map(directive => <option key={directive.directiveId} value={directive.directiveId}>{directive.name}</option>)}</select>
        </div>
        <div>
            <label htmlFor='cost'>Cost</label>
            <input ref={costRef} id='cost' type="number" min="0" required/>
        </div>
        <div>
            <label htmlFor='isRecurring'>Is Recurring Expense</label>
            <input id='isRecurring' onClick={() => {setIsRecurring(!isRecurring)}} type="checkbox"  value={isRecurring}/>
        </div>
        {(isRecurring) ?
        <div>
            <label htmlFor='lastDateUsed'>Last Date Used</label>
            <input ref={lastUsedDateRef} id='lastDateUsed' type="date" required={isRecurring}/>
        </div> : null}
        {(isRecurring) ?  
        <div>
            <label htmlFor='billedEvery'>Billed Every</label>
            <input ref={billedEveryRef} id='billedEvery' type="number" required={isRecurring}/>
        </div> : null}
        <button>Add Frequent</button>
    </form>
    </>
  )
}
