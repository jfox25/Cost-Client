import { motion } from "framer-motion"
import styles from './Modal.module.css'

const ModalBackdrop =({children, onClick}) => {
  return (
    <motion.div 
    className={styles.overlayStyles} 
    onClick={onClick}
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}
    >
        {children}
    </motion.div>
  )
}

export default ModalBackdrop