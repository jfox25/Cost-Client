import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Register.module.css"
import axios from '../../api/axios';
import {Link, useNavigate, useLocation} from "react-router-dom";
import logo from "../../images/CostLogo.png"
import stylesStatic from ".././StaticPages.module.css";

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/account/register';

const Register = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    const [nickName, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidName(nickName !== "");
    }, [nickName])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd, nickName])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v2 || !v1) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const register = {
                Email: email,
                NickName: nickName,
                Password: pwd,
                ConfirmPassword : matchPwd
            }
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(register),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            navigate("/login", { replace: true});
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response?.errMsg);
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className={stylesStatic.background}>
            <div className={stylesStatic.backgroundContainer}>
                <div className={stylesStatic.container}>
                    <section>
                        <p ref={errRef} className={errMsg ? styles.errMsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <Link to="/"><img src={logo} className={styles.logo}/></Link>
                            <h2 className={styles.registerTitle}>Register</h2>
                            <div>
                                <label className={styles.label} htmlFor="email">
                                    Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? styles.hide : styles.invalid} />
                                </label>
                                <input
                                    className={styles.input}
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-invalid={validEmail ? "true" : "false"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>
                            <p id="uidnote" className={emailFocus && email && !validEmail ? styles.instructions : styles.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must enter valid email.<br />
                            </p>
                            <div>
                                <label htmlFor="name" className={styles.label} >
                                Name:
                                <FontAwesomeIcon icon={faCheck} className={validName ? styles.valid : styles.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !nickName ? styles.hide : styles.invalid} />
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    id="name"
                                    ref={nameRef}
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    aria-invalid={validName ? "true" : "false"}
                                    aria-describedby="nameidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>
                            <p id="nameidnote" className={nameFocus && nickName && !validName ? styles.instructions : styles.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must enter a Nick Name<br />
                            </p>
                            <div>
                                <label htmlFor="password" className={styles.label} >
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? styles.hide : styles.invalid} />
                                </label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                            </div>
                            <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            <div>

                                <label htmlFor="confirm_pwd" className={styles.label} >
                                    Confirm:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? styles.hide : styles.invalid} />
                                </label>
                                <input
                                    className={styles.input}
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                            </div>
                            
                            <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            
                            
                            <button disabled={!validEmail || !validPwd || !validMatch || !validName? true : false}>Sign Up</button>
                            <p className={styles.linkBox}>
                                Already registered?<br />
                                <span className={styles.line}>
                                    <Link className={styles.link} to="/login">Login</Link>
                                </span>
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Register