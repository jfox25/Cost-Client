import { Link } from "react-router-dom";
import styles from "./StaticPages.module.css";
const Unauthorized = () => {
    return (
        <div className={styles.background}>
            <div className={styles.backgroundContainer}>
                <div className={styles.container}>
                    <h1 className={styles.titleError}>Unauthorized to View Resources</h1>
                    <p className={styles.listTitle}>Steps to fix Error:</p>
                    <ul className={styles.homeList}>
                        <li>Check that the url is valid and free of errors</li>
                        <li>Make sure you are logged into your <strong>Cost</strong> account</li>
                        <li>You may not have permissions to vist page</li>
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

export default Unauthorized;