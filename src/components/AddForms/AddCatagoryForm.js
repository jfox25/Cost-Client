import React, {useRef, useState} from 'react'
import styles from './Forms.module.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
export default function AddCatagoryForm({ onClose, fetchItems }) {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const nameRef = useRef('')
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
    const submitHandler = (event) => {
        event.preventDefault();
        const catagory = {
            name : nameRef.current.value
        }
        postItem(catagory);
    }
    const postItem = async (catagory) => {
        setIsLoading(true);
        setError(null);
        try{
            const response = await axiosPrivate.post("/categories",
            JSON.stringify(catagory),
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
                <input id='name' type="text" ref={nameRef} required/>
            </div>
            <button disabled={disableForm}>Add Catagory</button>
        </form>
        </>
    )
    if(isloading) {
        content = <p>Loading ...</p>
      }
  return (
    <>
        <h2>Add a Catagory</h2>
        {(error) ? <p className='errorDisplay'>{error}</p> : null}
        {content}
    </>
  )
}
