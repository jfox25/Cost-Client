import React, {useRef, useState, useCallback, useEffect} from 'react'
import styles from './Forms.module.css'
import SelectInput from './SelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
export default function AddBusinessForm({ onClose, fetchItems }) {
    const axiosPrivate = useAxiosPrivate();
    const [catagories, setCatagories] = useState([]);
    const[catagoryId, setCatagoryId] = useState(0);
    const[catagoryName, setCatagoryName] = useState(null);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disableForm, setDisableForm] = useState(false);
    const decipherError = (error) => {
        if(error.response.status === 404)
        {
          setError("Unable to connect with Server. Please try again.");
          setDisableForm(true);
        }else if(error.response.status === 401)
        {
          navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }else if(error.response.data !== "") {
          setError(error.response?.data)
        }else {
          setError("Error Loading Resources")
          setDisableForm(true);
        }
      }
    const nameRef = useRef('')
    const navigate = useNavigate();
    const location = useLocation();
    
    const submitHandler = (event) => {
        setDisableForm(true);
        event.preventDefault();

        const business = {
            name : nameRef.current.value,
            categoryId : catagoryId,
            categoryName : catagoryName
        }
        postBusiness(business);
        setDisableForm(false);
    }
    const postBusiness = async (business) => {
        setError(null);
        setIsLoading(true);
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
            decipherError(error)
        }
        finally {
            setIsLoading(false);
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
                setCatagories(transformedItems)
            } catch (error) {
                decipherError(error)
            }
            finally {
                setIsLoading(false)
            }
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
    const clearErrors = () => {
        if(!disableForm){
          setError(null);
        }
      }
   let content = (
    <>
    <form className={styles.form} onSubmit={submitHandler} onChange={clearErrors}>
        <div>
            <label htmlFor='name'>Name</label>
            <input id='name' type="text" ref={nameRef} maxLength="25" required/>
        </div>
        <SelectInput onSubmit={onSelectInputSubmitHandler} label={"Category"} isRequired={false} items={catagories}/>
        <button disabled={disableForm}>Add Business</button>
    </form>
    </>
   )
   if(isloading) {
    content = <p>Loading ...</p>
  }
  return (
    <>
    <h2>Add a Business</h2>
        {(error) ? <p className='errorDisplay'>{error}</p> : null}
        {content}
    </>
  )
}
