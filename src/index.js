import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomeComponent from './pages/HomeComponent';
import CompanyComponent from './pages/CompanyComponent';
import LogoutComponent from './pages/LogoutComponent';
import PrivateRouteNew from './utils/PrivateRouteNew';
import Config from './utils/Config';
import CompanyDetailsComponent from './pages/CompanyDetailsComponent';
import CompanyAddBankComponent from './pages/CompanyAddBankComponent';
import CompanyEditBankComponent from './pages/CompanyEditBankComponent';
import MedicineAddComponent from './pages/MedicineAddComponent';
import MedicineManageComponent from './pages/MedicineManageComponent';
import CompanyAccountComponent from './pages/CompanyAccountComponent';
import EmployeeComponent from './pages/EmployeeComponent';
import EmployeeDetailsComponent from './pages/EmployeeDetailsComponent';
import BillGenerateComponent from './pages/BillGenerateComponent';
import CustomerRequestComponent from './pages/‎CustomerRequestComponent';

//import MainComponent from "./components/MainComponent";
//import { PrivateRoute } from "./utils/PrivateRoute";
//import { PrivateRouteNew } from "./utils/PrivateRouteNew";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={Config.logoutPageUrl} element={<LogoutComponent />} />
      <Route path="/home" element={<PrivateRouteNew component={HomeComponent} activepage="0" />} />
      <Route path="/company" element={<PrivateRouteNew component={CompanyComponent} activepage="1" />} />
      <Route path="/companydetails/:id" element={<PrivateRouteNew component={CompanyDetailsComponent} activepage="1" />} />
      <Route path="/addCompanyBank/:id" element={<PrivateRouteNew component={CompanyAddBankComponent} activepage="1" />} />
      <Route path="/editcompanybank/:company_id/:id" element={<PrivateRouteNew component={CompanyEditBankComponent} activepage="1" />} />
      <Route path="/addMedicine" element={<PrivateRouteNew component={MedicineAddComponent} activepage="2" />} />
      <Route path="/manageMedicine" element={<PrivateRouteNew component={MedicineManageComponent} activepage="3" />} />
      <Route path="/manageCompanyAccount" element={<PrivateRouteNew component={CompanyAccountComponent} activepage="4" />} />
      <Route path="/employeeManage" element={<PrivateRouteNew component={EmployeeComponent} activepage="5" />} />
      <Route path="/employeedetails/:id" element={<PrivateRouteNew component={EmployeeDetailsComponent} activepage="5" />} />
      <Route path="/generateBill" element={<PrivateRouteNew component={BillGenerateComponent} activepage="6" />} />
      <Route path="/customerRequest" element={<PrivateRouteNew component={CustomerRequestComponent} activepage="7" />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
