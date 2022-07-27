import {useState, useEffect, useCallback} from "react";
import TableControl from "./Table/TableControl";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  { useNavigate, useLocation } from "react-router-dom";
import DirectiveTable from "./DirectiveTable/DirectiveTable";
import Modal from "./Modal/Modal";
import { AnimatePresence } from "framer-motion";
import BarChart from "./Charts/BarChar";

const DirectivePage = () => {
    const [items, setItems] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            const response = await axiosPrivate.get("/directives");
            const transformedItems = response.data?.map(directive => { return {
                    id : directive.directiveId,
                    Name : directive.name,
                    ExpenseCount : directive.numberOfExpenses,
                    TotalCost : directive.totalCostOfExpenses
                }
            })
            setItems(transformedItems)
        } catch (error) {
            decipherError(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchItemHandler();
    }, []);
    let content = (
      <>
        <DirectiveTable directives={items} />
        <BarChart data={items} title={"Directives Visualization"} />
      </>
    )

    if(isloading) {
        content = <p>Loading ...</p>
    }
    return (
        <div>
            <h1>Directives</h1>
            {content}
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
    )
}

export default DirectivePage;