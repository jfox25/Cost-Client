import React,{useState} from "react";
import Modal from "../Modal/Modal";
import styles from "./AddControl.module.css"
import { AnimatePresence } from "framer-motion";
const AddControl = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div>
        <div className={styles.addButtonContainer}>
          <button
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
        {isModalOpen && <Modal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={content}
              />}
        </AnimatePresence>
      </div>
    );
}
export default AddControl
