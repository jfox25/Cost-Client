import styles from ".././Pages/AboutPage.module.css"
import { useState } from "react"

const CollapseSection = ({title, content}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.collapseSectionContainer}>
        <h3 className={styles.collapseTitle}>{title}</h3>
        {(!isOpen) ? <button onClick={() => setIsOpen(true)} className={styles.collapseButton}>View</button> : null}
        {(isOpen) ? (
            <div>
                <div className={styles.collapseContent}>{content}</div>
                <button onClick={() => setIsOpen(false)} className={styles.collapseButton}>Close</button>
            </div>
        ) : null}
    </div>
  )
}

export default CollapseSection