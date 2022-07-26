import React, {useRef, useState, useEffect} from 'react'
import styles from './Forms.module.css'
import SelectInput from './SelectInput';
import RequiredSelectInput from './RequiredSelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { motion, AnimatePresence } from 'framer-motion';
import  { useNavigate, useLocation } from "react-router-dom";
const URL = "/expenses"

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
const ZERO = 0;

const AddExpenseForm = ({onClose, fetchItems}) => {
    const today = new Date();
    today.setMonth(today.getMonth()+1)
    const newDate = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-31`).toISOString().substring(0,10)
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [frequents, setFrequents] = useState([]);
    const [directives, setDirectives] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);
    const[categoryId, setCategoryId] = useState(0);
    const[categoryName, setCategoryName] = useState(null);
    const[businessId, setBusinessId] = useState(0);
    const[businessName, setBusinessName] = useState(null);
    const[frequentId, setFrequentId] = useState(0);
    const costRef = useRef(0)
    const directiveRef = useRef()
    const billedEveryRef = useRef()
    const frequentNameRef = useRef()
    const dateRef = useRef()
    const [isloading, setIsLoading] = useState(true);
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
    useEffect(() => {
      const fetchData = async () => {
        setError(null);
        setIsLoading(true)
        try {
          await fetchCategoriesHandler();
          await fetchBusinessHandler();
          await fetchDirectiveHandler();
          await fetchFrequentsHandler();
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
        setCategories(transformedItems)
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
      const fetchFrequentsHandler = async () => {
        const response = await axiosPrivate.get("/frequents");
        const filtredData = response.data?.filter(frequent => {
            return frequent.isRecurringExpense === false
        })
        const transformedItems = filtredData.map(frequent => { return {
                id : frequent.frequentId,
                Name : frequent.name,
                Recurring: frequent.isRecurringExpense
            }
        })
        setFrequents(transformedItems)
      }
      fetchData();
    }, []);
    const submitHandler = async (event) => {
      setDisableForm(true);
      event.preventDefault();
      let expense;
      if(frequentId === ZERO)
      {
        expense = {
            frequentId : ZERO,
            categoryId : parseInt(categoryId),
            businessId : parseInt(businessId),
            businessName : businessName,
            categoryName : categoryName,
            directiveId: parseInt(directiveRef.current.value),
            date : dateRef.current.value,
            isRecurringExpense : isRecurring,
            cost : parseFloat(costRef.current.value),
            billedEvery : (isRecurring)? parseInt(billedEveryRef.current.value) : ZERO,
            frequentName : (isRecurring)? frequentNameRef.current.value : null
        }
      } else {
        expense = {
          frequentId : parseInt(frequentId),  
          date : dateRef.current.value
      }
      }
      await postExpense(expense);
      setDisableForm(false);
    }
    const postExpense = async (expense) => {
      setIsLoading(true);
      setError(null);
        try {
            const response = await axiosPrivate.post(URL,
                JSON.stringify(expense ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            fetchItems();
            onClose();
        }
        catch(error) {
          decipherError(error);
        }
        finally {
          setIsLoading(false);
        }
    }

    const onCategorySelectInputSubmitHandler = (value) => {
      if(value.name !== ""){
            setCategoryId(parseInt(value.id))
            setCategoryName(value.name) 
        }else {
            setCategoryId(0)
            setCategoryName(null)
        }
    }
    const onBusinessSelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            setBusinessId(parseInt(value.id))
            setBusinessName(value.name) 
        }else {
            setBusinessId(0)
            setBusinessName(null)
        }
    }
    const onFrequentSelectInputSubmitHandler = (value) => {
        if(value.id !== "")
        {
            setFrequentId(value.id)
        }else {
            setFrequentId(0)
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
          <RequiredSelectInput
            onSubmit={onFrequentSelectInputSubmitHandler}
            label={"Frequent"}
            items={frequents}
            isRequired={false}
          />
          <div>
                  <label htmlFor="date">Date</label>
                  <input
                  ref={dateRef}
                  id="date"
                  type="date"
                  max={newDate}
                  required
                  />
            </div>
          {frequentId === 0 ? (
            <>
              <div>
                <label htmlFor="directive">Directive</label>
                <select id="directive" ref={directiveRef}>
                  {directives.map((directive) => (
                    <option
                      key={directive.id}
                      value={directive.id}
                    >
                      {directive.Name}
                    </option>
                  ))}
                </select>
              </div>
              <SelectInput
                onSubmit={onBusinessSelectInputSubmitHandler}
                label={"Business"}
                items={businesses}
                isRequired={true}
                />
                <SelectInput
                onSubmit={onCategorySelectInputSubmitHandler}
                label={"Category"}
                items={categories}
                isRequired={true}
                />
            
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
                          <label htmlFor="billedEvery">Billed Every(Month)</label>
                          <input
                            ref={billedEveryRef}
                            min="1"
                            id="billedEvery"
                            type="number"
                            required={isRecurring}
                          />
                        </div>
                        <div>
                          <label htmlFor="frequentName">Frequent Name</label>
                          <input
                            maxLength="25"
                            ref={frequentNameRef}
                            id="frequentName"
                            type="text"
                            required={isRecurring}
                          />
                        </div>
                </motion.div>
                ) : null}
              </AnimatePresence>
            </>
          ) : null}

          <button disabled={disableForm}>Add Expense</button>
        </form>
      </>
    )
    if(isloading) {
      content = <p>Loading ...</p>
    }
    return (
      <div>
        <h2>Add an Expense</h2>
        {(error) ? <p className='errorDisplay'>{error}</p> : null}
        {content}
      </div>
    );
}

export default AddExpenseForm;