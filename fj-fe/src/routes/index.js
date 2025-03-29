import HomePage from "../page/HomePage/HomePage";
import Candidate from "../page/Candidate/Candidate";
import Procedure from "../page/Procedure/Procedure";
import EmployeesProfile from "../page/EmployeesProfile/EmployeesProfile";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Account from "../page/Account/Account";
import CVManage from "../page/CVManage/CVManage";
import Recruitment from "../page/Recruitment/Recruitment";
import Test from "../page/Test/Test";
import { client_path, server_path } from "../utils/constant";
import Company from "../page/Company/Company";

export const routes = [
  {
    path: client_path.HOME,
    page: HomePage,
  },
  {
    path: client_path.CANDIDATE,
    page: Candidate,
  },
  {
    path: client_path.PROCEDURE,
    page: Procedure,
  },
  {
    path: "/candidate/:id",
    page: EmployeesProfile,
  },
  {
    path: client_path.LOGIN,
    page: Login,
  },
  {
    path: client_path.REGISTER,
    page: Register,
  },
  {
    path: client_path.ACCOUNT,
    page: Account,
    protected: true,
  },
  {
    path: client_path.CVMANAGE,
    page: CVManage,
    protected: true,
  },
  {
    path: client_path.RECRUITMENT,
    page: Recruitment,
    protected: true,
  },
  {
    path: client_path.COMPANY,
    page: Company,
  },
  {
    path: client_path.TEST,
    page: Test,
  },
];
