import React from 'react'
import styles from './Modal.module.css'
import ReactDOM from 'react-dom'

export default function Modal({isModalOpen, onClose, content}) {
    if(!isModalOpen) return null
  return ReactDOM.createPortal(
    <>
        <div className={styles.overlayStyles}></div>
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>X</button>
            <div className={styles.modalContent}>
                {React.cloneElement(content, onClose= {onClose})}
            </div>
        </div>
    </>,
    document.getElementById("portal")
  )
}
