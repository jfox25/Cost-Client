import React, {useRef} from 'react'
import styles from './Forms.module.css'
export default function AddCatagoryForm({ onClose, fetchItems }) {
    const nameRef = useRef('')
    const submitHandler = (event) => {
        event.preventDefault();

        const catagory = {
            name : nameRef.current.value
        }
        postItem(catagory);
    }
    const postItem = async (catagory) => {
        const response = await fetch('https://localhost:5001/api/categories', {
            method: 'POST',
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${process.env.REACT_APP_AUTHORIZATION}`
            }),
            body: JSON.stringify(catagory)
        });
        const data = await response.json();
        console.log(data)
        fetchItems();
        onClose();
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
