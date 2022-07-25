import {useState, useEffect} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate } from "react-router-dom";
import styles from "../Table/ItemDetail.module.css"
const URL = "analytic/userAnalytics"
const UserProfile = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get(URL);
                setData(response?.data)
            } catch (error) {
                setError(error.message);
                if(error.response.status === 401) {
                    navigate('/login', { state : {from: "/expenses"}, message: "Session has expired", replace : true});
                }
            }
            setIsLoading(false)
        }

        fetchUserData();
    }, [])
    let content = (
        <div className={styles.userProfile}>
            <h1 className={styles.title}>{data?.username}</h1>
            <h3 className={styles.subTitle}>{data?.nickName}</h3>
            <hr />
            <div className={styles.detailItem}>
                <p className={styles.itemKey}>Total Businesses</p>
                <p className={styles.itemValue}>{data?.numberOfBusinesses}</p>
            </div>
            <div className={styles.detailItem}>
                <p className={styles.itemKey}>Total Frequents</p>
                <p className={styles.itemValue}>{data?.numberOfFrequents}</p>
            </div>
            <div className={styles.detailItem}>
                <p className={styles.itemKey}>Total Expenses</p>
                <p className={styles.itemValue}>{data?.numberOfExpenses}</p>
            </div>
            <div className={styles.detailItem}>
                <p className={styles.itemKey}>Total Categories</p>
                <p className={styles.itemValue}>{data?.numberOfCategories}</p>
            </div>
            <div className={styles.detailItem}>
                <p className={styles.itemKey}>Total Cost of Expenses</p>
                <p className={styles.itemValue}>${data?.totalCostOfExpenses}</p>
            </div>
        </div>
    )
    if(error) {
        content = <p>{error}</p>
    }
    if(isLoading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default UserProfile;