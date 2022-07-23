import styles from './Navbar.module.css'
import logo from "../images/CostLogo.png"
const Logo = () => {
    return (
        <img className={styles.logo} src={logo} alt="Cost Logo" />
    )
}

export default Logo;