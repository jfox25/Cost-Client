import {useState, useEffect, useCallback} from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TableControl from "./Table/TableControl"
import AddExpenseForm from "./AddForms/AddExpenseForm"
import AddControl from "./Add/AddControl";
import  { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ExpensePage = () => {
    const dateConvertor = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        let month = d.getMonth()+1;
        let dt = d.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return (year+'-' + month + '-'+ dt);
    }
    const [expenses, setExpenses] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = useAxiosPrivate();
    const columns = [
      { name: "Business", sortable: true },
      { name: "Category", sortable: true },
      { name: "Directive", sortable: true },
      { name: "Date", sortable: true },
      { name: "Cost", sortable: false },
      {name: "Tools", sortable: false}
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
    const fetchExpensesHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/expenses");
            const transformedExpenses = response.data?.map(expense => { return {
                        id : expense.expenseId,
                        Business : expense.businessName,
                        Category : expense.categoryName,
                        Directive : expense.directiveName,
                        Date : dateConvertor(expense.date),
                        Cost : expense.cost,
                        } 
                    })
                    
            setExpenses(transformedExpenses)
        }
        catch (error) {
            decipherError(error)
        }
        finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        fetchExpensesHandler();
    }, []);
    const removeItem = (id) => {
        const newExpenses = expenses.filter(item => {
            return item.id !== id
        })
        setExpenses(newExpenses)
    }
   
    let content = <TableControl url="/expenses" columns={columns} items={expenses} addFilter={true} removeItem={removeItem} />
        if(isloading) {
            content = <p>Loading ...</p>
        }
        return (
          <div>
            <h1>Expenses</h1>
            {content}
            <AddControl
              content={<AddExpenseForm fetchItems={fetchExpensesHandler} />}
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

export default ExpensePage;