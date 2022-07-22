import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {useNavigate} from "react-router-dom"
import axios from "../api/axios";
import styles from "./Navbar.module.css"

function AccountInfo() {
    const LOGOUT_URL = "/account/logout"
    const { setAuth } = useContext(AuthContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
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
  return (
    <div className={styles.accountInfo}>
        <div>
            <p className={styles.nickName}>{auth.nickName}</p>
            <p className={styles.email}>({auth.email})</p>
        </div>
        <button onClick={logout}>Sign Out</button>
    </div>
  )
}

export default AccountInfo