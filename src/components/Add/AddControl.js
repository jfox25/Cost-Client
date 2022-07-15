import React,{useState} from "react";
import Modal from "../Modal/Modal";
import styles from "./AddControl.module.css"
const AddControl = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <div className={styles.addButtonContainer}>
                <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+</button>
             </div>
            <Modal content={content} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}
export default AddControl