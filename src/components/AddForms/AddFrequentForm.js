import React, {useRef, useState, useEffect} from 'react'
import styles from './Forms.module.css'
import RequiredSelectInput from './RequiredSelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { motion, AnimatePresence } from 'framer-motion';
import  { useNavigate, useLocation } from "react-router-dom";
import LoadingIndicator from '../Extra/LoadingIndicator';

const showMore = {
    hidden: {
      x: "-100%",
      opacity: 0
    },
    visable: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      }
    },
    exit: {
      x: "100%",
      opacity: 0
    },
  };
export default function AddFrequentForm({ onClose, fetchItems }) {
    const today = new Date();
    today.setMonth(today.getMonth()+1)
    const maxDate = new Date(`${today.getFullYear()}-${today.getMonth()}-31`).toISOString().substring(0,10)
    const minDate = new Date(`${today.getFullYear()}-${today.getMonth()}-1`).toISOString().substring(0,10)
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [catagories, setCatagories] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [directives, setDirectives] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);
    const[catagoryId, setCatagoryId] = useState(0);
    const[businessId, setBusinessId] = useState(0);
    const nameRef = useRef('')
    const costRef = useRef(0)
    const directiveRef = useRef()
    const billedEveryRef = useRef()
    const lastUsedDateRef = useRef()
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disableForm, setDisableForm] = useState(false);
    const decipherError = (error) => {
        if(error.response.status === 404)
        {
          setError("Unable to connect with Server. Please try again.");
          setDisableForm(true);
        }else if(error.response.status === 401)
        {
          navigate('/login', { state : {from: location, message: "Session has expired"}, replace : true});
        }else if(error.response.data !== "") {
          setError(error.response?.data)
        }else {
          setError("Error Loading Resources")
          setDisableForm(true);
        }
      }
    const submitHandler = (event) => {
        event.preventDefault();
        if(businessId === 0 || catagoryId === 0)
        {
            alert("error please fill in all required fields")
        }
        else {
            const frequent = {
                name : nameRef.current.value,
                categoryId : parseInt(catagoryId),
                businessId : parseInt(businessId),
                directiveId: parseInt(directiveRef.current.value),
                isRecurringExpense : isRecurring,
                cost : parseFloat(costRef.current.value),
                billedEvery : (isRecurring)? billedEveryRef.current.value : 0,
                lastUsedDate : (isRecurring)? lastUsedDateRef.current.value : null,
            }
            postFrequent(frequent);
        }
    }
    const postFrequent = async (frequent) => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await axiosPrivate.post("/frequents",
                JSON.stringify(frequent ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchItems();
            onClose();
        }
        catch(error) {
            decipherError(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true)
            try {
              await fetchCategoriesHandler();
              await fetchBusinessHandler();
              await fetchDirectiveHandler();
            } catch(error){
              decipherError(error)
            }
            finally {
              setIsLoading(false)
            }
          }
        const fetchCategoriesHandler = async () => {
            const response = await axiosPrivate.get("/categories");

            const transformedItems = response.data?.map(category => { return {
                    id : category.categoryId,
                    Name : category.name,
                }
            })
            setCatagories(transformedItems)
        }
        const fetchBusinessHandler = async () => {
            const response = await axiosPrivate.get("/business");
            const transformedItems = response.data?.map(business => { return {
                    id : business.businessId,
                    Name : business.name,
                }
            })
            setBusinesses(transformedItems)
        }
        const fetchDirectiveHandler = async () => {
            const response = await axiosPrivate.get("/directives");
            const transformedItems = response.data?.map(directive => { return {
                    id : directive.directiveId,
                    Name : directive.name,
                }
            })
            setDirectives(transformedItems)
        }
        fetchData();
    }, []);
    const onCatagorySelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            setCatagoryId(value.id)
        }
    }
    const onBusinessSelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            setBusinessId(value.id)
        }
    }
    const clearErrors = () => {
        if(!disableForm){
          setError(null);
        }
      }
  let content = (
    <>
      <form className={styles.form} onSubmit={submitHandler} onChange={clearErrors}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" maxLength="25" type="text" ref={nameRef} required />
        </div>
        <RequiredSelectInput
          isRequired={true}
          onSubmit={onCatagorySelectInputSubmitHandler}
          label={"Category"}
          items={catagories}
        />
        <RequiredSelectInput
          isRequired={true}
          onSubmit={onBusinessSelectInputSubmitHandler}
          label={"Business"}
          items={businesses}
        />
        <div>
          <label htmlFor="directive">Directive</label>
          <select id="directive" ref={directiveRef} required>
            {directives.map((directive) => (
              <option key={directive.id} value={directive.id}>
                {directive.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input step=".01" ref={costRef} id="cost" type="number" min="0" max="10000000" required />
        </div>
        <div>
          <label htmlFor="isRecurring">Is Recurring Expense</label>
          <input
            id="isRecurring"
            onClick={() => {
              setIsRecurring(!isRecurring);
            }}
            type="checkbox"
            value={isRecurring}
          />
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isRecurring ? (
            <motion.div
              variants={showMore}
              initial="hidden"
              animate="visable"
              exit="exit"
            >
              <div>
                <label htmlFor="lastDateUsed">Last Date Used</label>
                <input
                  ref={lastUsedDateRef}
                  max={maxDate}
                  min={minDate}
                  id="lastDateUsed"
                  type="date"
                  required={isRecurring}
                />
              </div>
              <div>
                <label htmlFor="billedEvery">Billed Every (months)</label>
                <input
                  ref={billedEveryRef}
                  id="billedEvery"
                  type="number"
                  min="1"
                  required={isRecurring}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <button disabled={disableForm}>Add Frequent</button>
      </form>
    </>
  )
  if(isloading) {
    content = <LoadingIndicator />
  }
  return (
    <div>
    <h2>Add a Frequent</h2>
    {(error) ? <p className='errorDisplay'>{error}</p> : null}
    {content}
  </div>
  );
}
