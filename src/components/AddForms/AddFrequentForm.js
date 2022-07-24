import React, {useRef, useState, useCallback, useEffect} from 'react'
import styles from './Forms.module.css'
import RequiredSelectInput from './RequiredSelectInput';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { motion, AnimatePresence } from 'framer-motion';

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
                cost : parseInt(costRef.current.value),
                billedEvery : (isRecurring)? billedEveryRef.current.value : 0,
                lastUsedDate : (isRecurring)? lastUsedDateRef.current.value : null,
            }
            console.log(frequent)
            postFrequent(frequent);
        }
    }
    const postFrequent = async (frequent) => {
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
            console.error(error)
        }
    }
    useEffect(() => {
        const fetchCatagoriesHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/categories");
                
                const transformedItems = response.data?.map(category => { return {
                        id : category.categoryId,
                        Name : category.name,
                    }
                })
                setCatagories(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        const fetchBusinessHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/business");
                const transformedItems = response.data?.map(business => { return {
                        id : business.businessId,
                        Name : business.name,
                    }
                })
                setBusinesses(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        const fetchDirectiveHandler = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axiosPrivate.get("/directives");
                const transformedItems = response.data?.map(directive => { return {
                        id : directive.directiveId,
                        Name : directive.name,
                    }
                })
                console.log(transformedItems)
                setDirectives(transformedItems)
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false)
    
        }
        fetchCatagoriesHandler();
        fetchBusinessHandler();
        fetchDirectiveHandler();
    }, []);
    const onCatagorySelectInputSubmitHandler = (value) => {
        if(value.name !== "")
        {
            console.log(value.id)
            setCatagoryId(value.id)
        }
    }
    const onBusinessSelectInputSubmitHandler = (value) => {
        console.log(value)
        if(value.name !== "")
        {
            setBusinessId(value.id)
        }
    }
    // let content = <h2>Add a Business</h2>;
    // if(error) {
    //     content = <p>{error}</p>
    // }
    // if(isloading) {
    //     content = <p>Loading ...</p>
    // }
  return (
    <>
    <h2>Add a Frequent</h2>
    <form className={styles.form} onSubmit={submitHandler}>
        <div>
            <label htmlFor='name'>Name</label>
            <input id='name' type="text" ref={nameRef} required/>
        </div>
        <RequiredSelectInput isRequired={true} onSubmit={onCatagorySelectInputSubmitHandler} label={"Category"} items={catagories} />
        <RequiredSelectInput isRequired={true} onSubmit={onBusinessSelectInputSubmitHandler} label={"Business"} items={businesses} />
        <div>
            <label htmlFor='directive'>Directive</label>
            <select id='directive' ref={directiveRef}>{directives.map(directive => <option key={directive.id} value={directive.id}>{directive.Name}</option>)}</select>
        </div>
        <div>
            <label htmlFor='cost'>Cost</label>
            <input ref={costRef} id='cost' type="number" min="0" required/>
        </div>
        <div>
            <label htmlFor='isRecurring'>Is Recurring Expense</label>
            <input id='isRecurring' onClick={() => {setIsRecurring(!isRecurring)}} type="checkbox"  value={isRecurring}/>
        </div>
        <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
              >
        {(isRecurring) ?
        <motion.div
        variants={showMore}
        initial="hidden"
        animate="visable"
        exit="exit"
        >
        <div>
            <label htmlFor='lastDateUsed'>Last Date Used</label>
            <input ref={lastUsedDateRef} id='lastDateUsed' type="date" required={isRecurring}/>

        </div> 
         <div>
            <label htmlFor='billedEvery'>Billed Every</label>
            <input ref={billedEveryRef} id='billedEvery' type="number" required={isRecurring}/>
        </div>
       </motion.div>: null}
        </AnimatePresence>
        <button>Add Frequent</button>
    </form>
    </>
  )
}
