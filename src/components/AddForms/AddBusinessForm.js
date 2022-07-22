import React, {useRef, useState, useCallback, useEffect} from 'react'
import styles from './Forms.module.css'
import SelectInput from './SelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
export default function AddBusinessForm({ onClose, fetchItems }) {
    const axiosPrivate = useAxiosPrivate();
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
        try{
            const response = await axiosPrivate.post("/business",
            JSON.stringify(business),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            fetchItems();
            onClose();
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const fetchItemHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/categories")
                const transformedItems = response.data?.map(category => { return {
                        id : category.categoryId,
                        Name : category.name,
                    }
                })
                console.log(transformedItems)
                setCatagories(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        fetchItemHandler();
    }, []);
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
        <SelectInput onSubmit={onSelectInputSubmitHandler} label={"Category"} isRequired={false} items={catagories}/>
        <button>Add Business</button>
    </form>
    </>
  )
}
