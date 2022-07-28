import { Link} from "react-router-dom"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import styles from "./Navbar.module.css"
const DEFAULT_DROP_DOWN_VALUE = "More"
const Navbar = () => {
    const location = useLocation();
    const [showDropDown, setShowDropDown] = useState(false)
    const [dropDownActive, setDropDownActive] = useState(false)
    const [dropDownValue, setDropDownValue] = useState()
    useEffect(() => {
      if(showDropDown === false) {
        switch (location.pathname) {
          case "/businesses":
            setDropDownValue("Businesses")
            setDropDownActive(true);
            break;
          case "/categories":
            setDropDownValue("Categories")
            setDropDownActive(true);
            break;
          case "/directives":
            setDropDownValue("Directives")
            setDropDownActive(true);
            break;
          default:
            setDropDownValue(DEFAULT_DROP_DOWN_VALUE)
            break;
        }
      }
    }, [showDropDown, location])
  
    const onDropDownItemClick = (e) => {
      setDropDownValue(e.target.innerText)
      setDropDownActive(true);
      setShowDropDown(false);
    }
    const onNavbarItemClick = () => {
      setDropDownActive(false);
      setShowDropDown(false);
    }
    return (
      <div className={styles.navbar}>
        <NavbarLink onClick={onNavbarItemClick} to="/expenses">Expenses</NavbarLink>
        <NavbarLink onClick={onNavbarItemClick} to="/frequents">Frequents</NavbarLink>
        <div className={styles.navbarDropdown}>
          <button onClick={() => setShowDropDown(!showDropDown)} className={(!dropDownActive) ? styles.navbarItem : styles.activeButton}>{dropDownValue}</button>
          <div className={(showDropDown) ? styles.dropdownLinkList : styles.none}>
            <NavbarDropDownLink onClick={onDropDownItemClick} to="/businesses">Businesses</NavbarDropDownLink>
            <NavbarDropDownLink onClick={onDropDownItemClick} to="/categories">Categories</NavbarDropDownLink>
            <NavbarDropDownLink onClick={onDropDownItemClick} to="/directives">Directives</NavbarDropDownLink>
          </div>
        </div>
        <NavbarLink onClick={onNavbarItemClick} to="/analytics">Analytics</NavbarLink>
       
      </div>
    );
}

export default Navbar;

function NavbarLink( {to, children, onClick})
{
  const location = useLocation();
  return (
    <Link
        onClick={onClick}
        className={location.pathname === to ? styles.active : styles.navbarItem}
        to={to}
      >
        {children}
      </Link>
    )
  }

function NavbarDropDownLink( {to, children, onClick})
{
  const location = useLocation();
  return (
    <Link
        onClick={onClick}
        className={location.pathname === to ? styles.active : styles.navbarItem}
        to={to}
      >
        {children}
      </Link>
    )
}

   

