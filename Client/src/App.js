import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import HrDashboard from './pages/HrDashboard/HrDashboard';
import { Header } from './componenets/Header/Header';
import { Footer } from './componenets/Footer/Footer';
import Layout from './Layout/Layout';
import Profile from './componenets/Profile/Profile';
import { AddUser } from './componenets/Hr/AddUser/AddUser';
import RequestLeaves from './componenets/Hr/RequestLeaves/RequestLeaves';
import ReimbursementRequest from './componenets/Hr/ReImburesementRequests/RemebRequest';
import ApplyLeave from './componenets/ApplyLeave/ApplyLeave';
import ApplyReimbursmnet from './componenets/ApplyReimursment/ApplyReimbursmnet';
import RequestedLeave from './componenets/RequestedLeave/RequestedLeave';
import RequestedReImbursment from './componenets/RequestedReImbusrments/RequestedReImbursment';

function App() {
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route element={<Layout/>}>
      <Route path={"/employee-dashboard"} element={<EmployeeDashboard/>}/>
      <Route path={"/hr-dashboard"} element={<HrDashboard/>}/>
      <Route path={"/profile"} element={<Profile/>}/>
      <Route path={"/add_user"} element={<AddUser/>}/>
      <Route path='/leave_requests' element={<RequestLeaves/>}/>
      <Route path='/reimbursement_requests' element={<ReimbursementRequest/>}/>
      <Route path='/apply_leave' element={<ApplyLeave/>}/>
      <Route path = "/apply_reimbursement" element={<ApplyReimbursmnet/>}/>
      <Route path='/requested_leaves' element = {<RequestedLeave/>}/>
      <Route path ="/requested_reimbursements" element ={<RequestedReImbursment/>}/>
      </Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
