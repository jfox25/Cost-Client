import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.footerContainer}>
            <p className={styles.copyright}> &copy; Cost All Rights Reserved</p>
            <Link className={styles.aboutLink} to="/about">Learn more about Cost</Link>
            <ul className={styles.socials}>
                <li><a href='https://github.com/jfox25' target="/"><FontAwesomeIcon icon={faGithub} className={styles.socialItem} /></a></li>
                <li><a href='https://www.linkedin.com/in/jamesconnorfox/' target="/"><FontAwesomeIcon icon={faLinkedin} className={styles.socialItem} /></a></li>
            </ul>
            <p className={styles.logo}>COST</p>
        </div>
    </div>
  )
}

export default Footer