import {useState, useEffect, useCallback} from "react"
import TableControl from "./Table/TableControl"
import AddFrequentForm from "./AddForms/AddFrequentForm";
import AddControl from "./Add/AddControl"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal/Modal";
import { AnimatePresence } from "framer-motion";

const FrequentPage = () => {
    const dateConvertor = (date, monthIncrementor = 0) => {
        const d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth()+ monthIncrementor + 1;
        let dt = d.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if(month > 12) {
          const numberOfYears = Math.floor(month / 12);
          console.log(numberOfYears)
          console.log(month)
          month = (month - (numberOfYears * 12));
          console.log(month)
          // month = 5;
          year = year + numberOfYears;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return (year+'-' + month + '-'+ dt);
    }
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const columns = [
      { name: "Name", sortable: false },
      { name: "Business", sortable: true },
      { name: "Category", sortable: true },
      { name: "Is Recurring", sortable: true },
      { name: "Next Bill Date", sortable: false },
      { name: "Tools", sortable: false },
    ];
    useEffect(() => {
        if(error) {
          setIsModalOpen(true);
        }else {
          setIsModalOpen(false);
        }
      }, [error])
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
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/frequents");
            const transformedFrequents = response.data?.map(frequent => { return {
                id : frequent.frequentId,
                Name : frequent.name,
                Business : frequent.businessName,
                Category : frequent.categoryName,
                IsRecurring : (frequent.isRecurringExpense) ? "Yes" : "No",
                NextBillDate : (frequent.isRecurringExpense) ? dateConvertor(frequent.lastUsedDate, frequent.billedEvery) : "-",
                } 
            })
            setItems(transformedFrequents)
        } catch (error) {
            decipherError(error)
        }
        finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        fetchItemHandler();
    }, []);
    const removeItem = (id) => {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
    }
    let content = <TableControl url="/frequents" addFilter={false} columns={columns} items={items} removeItem={removeItem}/>;
    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
      <div>
        <h1>Frequents</h1>
        {content}
        <AddControl
          content={<AddFrequentForm fetchItems={fetchItemHandler} />}
        />
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isModalOpen && (
            <Modal
              isModalOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              content={
                <div className={"errorModal"}>
                  <h1>Error</h1>
                  <hr />
                  <p className={`errorDisplay`}>{error}</p>
                </div>
              }
            />
          )}
        </AnimatePresence>
      </div>
    );
}

export default FrequentPage;