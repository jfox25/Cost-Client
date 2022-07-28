import './App.css';
import {Routes, Route } from "react-router-dom";
import Layout from './components/Pages/Layout';
import ExpensePage from './components/Pages/ExpensePage'
import FrequentPage from "./components/Pages/FrequentPage";
import AnalyticPage from "./components/Pages/AnalyticPage";
import BusinessPage from "./components/Pages/BusinessPage";
import CategoryPage from "./components/Pages/CategoryPage";
import DirectivePage from "./components/Pages/DirectivePage";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Home from "./components/Pages/Home"
import Unauthorized from './components/Pages/Unauthorized';
import AdminDashboard from './components/Pages/AdminDashboard';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import NotFoundPage from './components/Pages/NotFoundPage';

const ROLES = {
  user : "User",
  admin : "Admin"
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="expenses" element={<ExpensePage />} />
            <Route path="frequents" element={<FrequentPage />} />
            <Route path="businesses" element={<BusinessPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="directives" element={<DirectivePage />} />
            <Route path="analytics" element={<AnalyticPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
        {/* catch all*/}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
