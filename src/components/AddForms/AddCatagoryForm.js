import React, {useRef} from 'react'
import styles from './Forms.module.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
export default function AddCatagoryForm({ onClose, fetchItems }) {
    const axiosPrivate = useAxiosPrivate();
    const nameRef = useRef('')
    const submitHandler = (event) => {
        event.preventDefault();

        const catagory = {
            name : nameRef.current.value
        }
        postItem(catagory);
    }
    const postItem = async (catagory) => {
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
            console.error(error)
        }
    }
  return (
    <>
        <h2>Add a Catagory</h2>
        <form className={styles.form} onSubmit={submitHandler}>
            <div>
                <label htmlFor='name'>Name</label>
                <input id='name' type="text" ref={nameRef} required/>
            </div>
            <button>Add Catagory</button>
        </form>
    </>
  )
}
