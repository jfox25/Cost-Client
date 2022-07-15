import React, {useRef, useState, useCallback, useEffect} from 'react'
import styles from './Forms.module.css'
import SelectInput from './SelectInput';
export default function AddBusinessForm({ onClose, fetchItems }) {
    const [catagories, setCatagories] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const[catagoryId, setCatagoryId] = useState(0);
    const[catagoryName, setCatagoryName] = useState(null);
    const [error, setError] = useState(null);
    const nameRef = useRef('')
    
    const submitHandler = (event) => {
        event.preventDefault();

        const business = {
            name : nameRef.current.value,
            categoryId : catagoryId,
            categoryName : catagoryName
        }
        postBusiness(business);
    }
    const postBusiness = async (business) => {
        const response = await fetch('https://localhost:5001/api/business', {
            method: 'POST',
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
            }),
            body: JSON.stringify(business)
        });
        const data = await response.json();
        fetchItems();
        onClose();
    }
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
                }
            })
            setCatagories(transformedItems)
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false)

    }, [])
    useEffect(() => {
        fetchItemHandler();
    }, [fetchItemHandler]);
    const onSelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            setCatagoryId(value.id)
            setCatagoryName(value.name) 
        }else {
            setCatagoryId(0)
            setCatagoryName(null)
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
    <h2>Add a Business</h2>
    <form className={styles.form} onSubmit={submitHandler}>
        <div>
            <label htmlFor='name'>Name</label>
            <input id='name' type="text" ref={nameRef} required/>
        </div>
        <SelectInput onSubmit={onSelectInputSubmitHandler} label={"Category"} isRequired={false} items={catagories} />
        <button>Add Business</button>
    </form>
    </>
  )
}
