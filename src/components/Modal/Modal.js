import React from 'react'
import styles from './Modal.module.css'
import ReactDOM from 'react-dom'
import ModalBackdrop from './ModalBackdrop'
import { motion } from 'framer-motion'

const dropIn = {
  hidden: {
    top: "0%",
    opacity: 0
  },
  visable: {
    top: "50%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    }
  },
  exit: {
    top: "0%",
    opacity: 0
  },
};

export default function Modal({isModalOpen, onClose, content}) {
  if(!isModalOpen) return null
  return ReactDOM.createPortal(
    <>
      <ModalBackdrop onClick={onClose}>
        <motion.div 
        onClick={(e) => e.stopPropagation()} 
        className={styles.modal}
        variants={dropIn}
        initial="hidden"
        animate="visable"
        exit="exit"
        >
          <button className={styles.closeButton} onClick={onClose}>X</button>
          <div className={styles.modalContent}>
              {React.cloneElement(content, onClose={onClose})}
          </div>
        </motion.div>
      </ModalBackdrop>
    </>,
    document.getElementById("portal")
    )
  }
  