import PATHS from "./path";
import Home from "../pages/Home";
import AboutUs from "../pages/About";
import Job from "../pages/Jobs";
import JobDetail from "../pages/Jobs/_id";
import Auth from "../pages/Auth";

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
];

export const protectedRoutes = [];
