import {useState, useEffect} from "react"
import TableControl from "../Table/TableControl"
import AddControl from '../Add/AddControl'
import AddBusinessForm from "../AddForms/AddBusinessForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Leaderboard from "../Leaderboard/Leaderboard";
import  { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import { AnimatePresence } from "framer-motion";
import LoadingIndicator from "../Extra/LoadingIndicator";

const BusinessPage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    
    const columns = [
      { name: "Name", sortable: false },
      { name: "Expense Count", sortable: true },
      { name: "Total Cost", sortable: true },
      { name: "Category", sortable: true },
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
    const fetchItemHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosPrivate.get("/business");
            const transformedItems = response.data?.map(business => { return {
                    id : business.businessId,
                    Name : business.name,
                    ExpenseCount : business.numberOfExpenses,
                    TotalCost : business.totalCostOfExpenses,
                    Category : (business.categoryName === null) ? "-" : business.categoryName
                }
            })
            setItems(transformedItems)
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
    let content = (
        <>
            <TableControl url="/business" columns={columns} items={items} removeItem={removeItem}/>
            <Leaderboard items={items}/>
        </>
    );
    if(isloading) {
        content = <LoadingIndicator />
    }
    return (
      <div>
        <h1 className="pageTitle">Businesses</h1>
        {content}
        <AddControl
          content={<AddBusinessForm fetchItems={fetchItemHandler} />}
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

export default BusinessPage;