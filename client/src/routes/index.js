import PATHS from "./path";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Job from "../pages/Jobs";
import JobDetail from "../pages/Jobs/_id";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile/_id";
import UserCompany from "../pages/Profile/_idComp";
import CompanyJobs from "../pages/Recruitment";
import TestDetail from "../pages/Recruitment/_id";
import Answer from "../pages/Jobs/_idAnswer";
import ApplicantAnswer from "../pages/Recruitment/indexAnswer";
import CheckoutPage from "../pages/Paid/_id";

export const routes = [
  {
    path: PATHS.HOME,
    page: Home,
  },
  {
    path: PATHS.ABOUT,
    page: AboutUs,
  },
  {
    path: PATHS.JOB,
    page: Job,
  },
  {
    path: PATHS.JOBDETAIL,
    page: JobDetail,
  },
  {
    path: PATHS.LOGIN,
    page: Auth,
  },
  {
    path: PATHS.REGISTER,
    page: Auth,
  },
  {
    path: PATHS.ANSWER,
    page: Answer,
  },
  {
    path: PATHS.PAYPAL,
    page: CheckoutPage,
  },
];

export const protectedRoutes = [
  {
    path: PATHS.PROFILE,
    page: Profile,
  },
  {
    path: PATHS.COMPANY_INFO,
    page: UserCompany,
  },
  {
    path: PATHS.COMPANY_JOBS,
    page: CompanyJobs,
  },
  {
    path: PATHS.COMPANY_TEST,
    page: TestDetail,
  },
  {
    path: PATHS.APPLICANT_ANSWER,
    page: ApplicantAnswer,
  },
];
