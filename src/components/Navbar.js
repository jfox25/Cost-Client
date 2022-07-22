import { Link, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import styles from "./Navbar.module.css"

const Navbar = () => {
    // const location = useLocation();
    // const [isActive, setIsActive] = useState("")
    // const [currentLocation, setCurrentLocation] = useState()
    // useEffect(() => {
    //   console.log(location.pathname)
    //   setCurrentLocation(location.pathname)
    // }, [])
    // useEffect(() => {
      
    // }, [currentLocation])
    // const setActiveLink = (e) => {
    //   console.log(currentLocation.includes(e.target.innerText.toLowerCase()))
    //     if(currentLocation.includes(e.target.innerText.toLowerCase()))
    //     {
    //       setIsActive(e?.target?.innerText)
    //     }
    // }
    return (
      <div className={styles.navbar}>
        <NavbarLink to="/expenses">Expenses</NavbarLink>
        <NavbarLink to="/frequents">Frequents</NavbarLink>
        <NavbarLink to="/businesses">Businesses</NavbarLink>
        <NavbarLink to="/categories">Categories</NavbarLink>
        <NavbarLink to="/directives">Directives</NavbarLink>
        <NavbarLink to="/analytics">Analytics</NavbarLink>
        {/* <Link
          onClick={setActiveLink}
          className={
            isActive === "Expenses"
              ?  styles.active
              : styles.navbarItem
          }
          to="/expenses"
        >
          Expenses
        </Link>
        <Link
         onClick={setActiveLink}
          className={
            isActive === "Frequents"
              ? styles.active
              : styles.navbarItem
          }
          to="/frequents"
        >
          Frequents
        </Link>
        <Link
         onClick={setActiveLink}
          className={
            isActive === "Catagories"
              ?  styles.active
              : styles.navbarItem
          }
          to="/categories"
        >
          Catagories
        </Link>
        <Link
         onClick={setActiveLink}
          className={
            isActive === "Businesses"
              ?  styles.active
              : styles.navbarItem
          }
          to="/businesses"
        >
          Businesses
        </Link>
        <Link
        onClick={setActiveLink}
          className={
            isActive === "Directives"
              ?  styles.active
              : styles.navbarItem
          }
          to="/directives"
        >
          Directives
        </Link>
        <Link
        onClick={setActiveLink}
          className={
            isActive === "Analytics"
              ?  styles.active
              : styles.navbarItem
          }
          to="/analytics"
        >
          Analytics
        </Link> */}
      </div>
    );
}

export default Navbar;

function NavbarLink( {to, children})
{
  const location = useLocation();
  return (
    <Link
        className={location.pathname === to ? styles.active : styles.navbarItem}
        to={to}
      >
        {children}
      </Link>
    )
  }

   

