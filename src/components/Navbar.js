const Navbar = (props) => {
    const buttonClickHandler = (event) => {
        props.onPageChange(event.target.innerHTML)
    }
    return(
        <div>
            <button onClick={buttonClickHandler}>Expenses</button>
            <button onClick={buttonClickHandler}>Frequents</button>
            <button onClick={buttonClickHandler}>Catagories</button>
            <button onClick={buttonClickHandler}>Businesses</button>
            <button onClick={buttonClickHandler}>Directives</button>
            <button onClick={buttonClickHandler}>Analytics</button>
        </div>
    )
}

export default Navbar;