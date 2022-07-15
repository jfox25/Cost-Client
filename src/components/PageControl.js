import { useEffect, useState } from "react";
import Demo from './Demo'
import FrequentPage from "./FrequentPage";
import DemoAnalytics from "./DemoAnalytics";
import Navbar from "./Navbar";
import BusinessPage from "./BusinessPage";
import CategoryPage from "./CategoryPage";
import DirectivePage from "./DirectivePage";
import Register from "./Login/Register";

const PageControl = () => {
    const [activePage, setActivePage] = useState("Expenses");
    const [content, setContent] = useState();
    useEffect (() => {
        switch (activePage) {
            case "Expenses":
                setContent(<Demo />)
                break;
            case "Frequents":
                setContent(<FrequentPage />)
                break;
            case "Catagories":
                setContent(<CategoryPage />)
                break;
            case "Businesses":
                setContent(<BusinessPage  />)
                break;
            case "Directives":
                setContent(<DirectivePage />)
                break;
            case "Analytics":
                setContent(<DemoAnalytics/>)
                break;
            case "Register":
                setContent(<Register/>)
                break;
            default:
                break;
        }
    }, [activePage, setContent])
    const changePageHandler = (pageValue) => {
        setActivePage(pageValue)
    }
    return (
        <div>
            <Navbar onPageChange={changePageHandler} />
            {content}
        </div>
    )  
}

export default PageControl;