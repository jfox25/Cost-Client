import { Link } from "react-router-dom";
import styles from "./StaticPages.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.background}>
        <div className={styles.backgroundContainer}>
            <div className={styles.container}>
                <h1 className={styles.titleError}>404 - Resource Not Found</h1>
                <p className={styles.listTitle}>Steps to fix Error:</p>
                <ul className={styles.homeList}>
                    <li>Check that the url is valid and free of errors</li>
                    <li>Make sure request is sent out successfully in your DevTools Network Tab</li>
                    <li>Navigate to one the the pages below</li>
                </ul>
                <h3>Places to go</h3>
                <div className={styles.buttonGroup}>
                    <Link className={styles.buttonOneSmall} to="/">Home</Link>
                    <Link className={styles.buttonOneSmall} to="/login">Login</Link>
                    <Link className={styles.buttonOneSmall} to="/about">About</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage