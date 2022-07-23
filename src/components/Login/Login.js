import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {Link, useNavigate, useLocation} from "react-router-dom"
import axios from "../../api/axios";
import logo from "../../images/CostLogo.png"
import styles from "./Register.module.css"

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/expenses"
    const message = location.state?.message || ""

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("")

    const LOGIN_URL = "/account/login"

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ Email : email, Password : pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            const nickName = response?.data?.nickName
            setAuth({email, pwd, accessToken, roles, nickName})
            setEmail("")
            setPwd("")
            navigate(from, { replace: true});
        } catch(err) {
            if(!err?.response) {
                setError("No error Response")
            } else if (err?.response?.status === 401){
                setError("Invalid Credentials")
            } else {
                setError("Login failed")
            }
        }
    }
    const togglePersist =() => {
        setPersist(prev => !prev);
    }
    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])
 return (
    <>
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <img src={logo} className={styles.logo}/>
            <h2 className={styles.loginTitle}>Login</h2>
            <div className={styles.error}>
                {(message === "") ? null : <p className={styles.message}>{message}</p>}
                {(error === "") ? null : <p className={styles.errorMessage}>{error}</p>}
            </div>
            <div>
                <label className={styles.label}>Email</label>
                <input 
                    className={styles.input}
                    value={email} type="email" 
                    required  
                    onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div>
                <label className={styles.label}>Password</label>
                <input 
                    className={styles.input} 
                    value={pwd} type="password" 
                    required  
                    onChange={(e) => setPwd(e.target.value)}
                />
            </div>
           <button>Login</button>
           <div className={styles.rememberDevice}>
                <input 
                    type="checkbox" 
                    id="persist"
                    onChange={togglePersist}
                    checked ={persist}
                />
                <label htmlFor="persist">Trust This Device</label>
           </div>
        </form>
    </>
 )
}
export default Login;