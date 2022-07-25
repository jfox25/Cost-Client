import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "../api/axios";
import styles from "./Navbar.module.css"
import Modal from "./Modal/Modal";
import UserProfile from "./UserProfile/UserProfile";
import { AnimatePresence } from "framer-motion";
const LOGOUT_URL = "/account/logout"

function AccountInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async (e) => {
        e.stopPropagation();
        try {
            const response = await axios.get(LOGOUT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setAuth({});
            navigate('/');
        }
    }
    const profileClickHandler = () => {
        setIsModalOpen(true)
    }
  return (
    <div className={styles.accountInfo} onClick={profileClickHandler}>
        <div>
            <p className={styles.nickName}>{auth.nickName}</p>
            <p className={styles.email}>({auth.email})</p>
        </div>
        <button onClick={logout}>Sign Out</button>
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
        >
        {isModalOpen && <Modal
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content={<UserProfile />}
              />}
        </AnimatePresence>
    </div>
  )
}

export default AccountInfo