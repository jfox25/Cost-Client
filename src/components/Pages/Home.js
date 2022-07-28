import { Link } from "react-router-dom";
import styles from "../StaticPages.module.css";
import logo from "../../images/CostLogo.png";
import SlideShow from ".././Extra/SlideShow";
const BENEFIT_LIST = [
    "Easily keep track of all your Expenses, Frequents, Categories,and Businesses.",
    "Our interactive tables allow you to easily sort, delete, view, and filter your data.",
    "Create expenses in no time using Frequents.",
    "No need to waste time entering repetitive monthly expenses, Cost does it for you.",
    "Get month by month analytical data in your Analytics page."
] 
const Home = () => {
    return (
        <div className={styles.background}>
            <div className={styles.backgroundContainer}>
                <div className={styles.container}>
                    <img src={logo} className={styles.logo}/>
                    <p className={styles.slogan}>Expense tracking just got easier</p>
                  
                    <p className={styles.listTitle}>What Cost can do for you:</p>
                    <SlideShow slideValues={BENEFIT_LIST} />
                    <Link className={styles.signUpButton} to="/register">Start Using Cost</Link>
                    <p className={styles.loginLabel}>Already have an account?</p>
                    <Link className={styles.buttonOneSmall} to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;