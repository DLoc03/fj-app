import HomePage from "../page/HomePage/HomePage";
import Candidate from "../page/Candidate/Candidate";
import Procedure from "../page/Procedure/Procedure";
import EmployeesProfile from "../page/EmployeesProfile/EmployeesProfile";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Account from "../page/Account/Account";
import CVManage from "../page/CVManage/CVManage";
import Recruitment from "../page/Recruitment/Recruitment";

export const routes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/candidate",
    page: Candidate,
  },
  {
    path: "/procedure",
    page: Procedure,
  },
  {
    path: "/job-desp",
    page: EmployeesProfile,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/register",
    page: Register,
  },
  {
    path: "/account",
    page: Account,
  },
  {
    path: "/cv",
    page: CVManage,
  },
  {
    path: "/recruitment",
    page: Recruitment,
  },
];
