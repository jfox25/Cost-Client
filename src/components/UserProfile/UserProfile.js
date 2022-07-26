import {useState, useEffect} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import styles from "../Table/ItemDetail.module.css"
const URL = "analytic/userAnalytics"
const UserProfile = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const decipherError = (error) => {
        if(error.response.status === 404)
        {
          setError("Unable to connect with Server. Please try again.");
        }else if(error.response.status === 401)
        {
          navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }else if(error.response.data !== "") {
          setError(error.response?.data)
        }else {
          setError("Error Loading Resources")
        }
      }
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get(URL);
                setData(response?.data)
            } catch (error) {
                decipherError(error);
            }
            finally {
                setIsLoading(false)
            }
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
        content = (
            <div className={"errorModal"}>
                <h1>Error</h1>
                <hr />
                <p className={`errorDisplay`}>{error}</p>
            </div>
        )
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