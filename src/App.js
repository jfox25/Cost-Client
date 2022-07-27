import { dom } from '@fortawesome/fontawesome-svg-core';
import './App.css';
// import PageControl from "./components/PageControl";
import {Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import ExpensePage from './components/ExpensePage'
import FrequentPage from "./components/FrequentPage";
import AnalyticPage from "./components/AnalyticPage";
// import Navbar from "./Navbar";
import BusinessPage from "./components/BusinessPage";
import CategoryPage from "./components/CategoryPage";
import DirectivePage from "./components/DirectivePage";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home"
import Unauthorized from './components/Unauthorized';
import AdminDashboard from './components/AdminDashboard';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import NotFoundPage from './components/NotFoundPage';

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
