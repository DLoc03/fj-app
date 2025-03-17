import HomePage from "../page/HomePage/HomePage";
import Candidate from "../page/Candidate/Candidate";
import Procedure from "../page/Procedure/Procedure";
import EmployeesProfile from "../page/EmployeesProfile/EmployeesProfile";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Account from "../page/Account/Account";
import CVManage from "../page/CVManage/CVManage";
import Recruitment from "../page/Recruitment/Recruitment";
import { endpoint } from "../utils/constant";

export const routes = [
  {
    path: endpoint.HOME,
    page: HomePage,
  },
  {
    path: endpoint.CANDIDATE,
    page: Candidate,
  },
  {
    path: endpoint.PROCEDURE,
    page: Procedure,
  },
  {
    path: endpoint.JOBDECS,
    page: EmployeesProfile,
  },
  {
    path: endpoint.LOGIN,
    page: Login,
  },
  {
    path: endpoint.REGISTER,
    page: Register,
  },
  {
    path: endpoint.ACCOUNT,
    page: Account,
    protected: true,
  },
  {
    path: endpoint.CVMANAGE,
    page: CVManage,
    protected: true,
  },
  {
    path: endpoint.RECRUITMENT,
    page: Recruitment,
    protected: true,
  },
];
