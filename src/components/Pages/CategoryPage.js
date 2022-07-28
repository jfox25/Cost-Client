import {useState, useEffect, useCallback} from "react"
import AddCatagoryForm from "../AddForms/AddCatagoryForm";
import TableControl from "../Table/TableControl"
import AddControl  from "../Add/AddControl";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Leaderboard from "../Leaderboard/Leaderboard";
import  { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import { AnimatePresence } from "framer-motion";
import LoadingIndicator from "../Extra/LoadingIndicator";

const CategoryPage = () => {
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
            const response = await axiosPrivate.get("/categories");
            const transformedItems = response.data?.map(category => { return {
                    id : category.categoryId,
                    Name : category.name,
                    ExpenseCount : category.numberOfExpenses,
                    TotalCost : category.totalCostOfExpenses
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
            <TableControl url="/categories" columns={columns} items={items} removeItem={removeItem}/>
            <Leaderboard items={items}/>
        </>
    );
    if(isloading) {
        content = <LoadingIndicator />
    }
    return (
      <div>
        <h1 className="pageTitle">Categories</h1>
        {content}
        <AddControl
          content={<AddCatagoryForm fetchItems={fetchItemHandler} />}
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

export default CategoryPage;