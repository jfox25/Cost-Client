import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Expense</h1>
            <h3>Register Now!</h3>
            <Link to="/register">Register</Link>
            <br />
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home;