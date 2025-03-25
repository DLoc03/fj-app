import { getData, postData, getDataByID } from "../api/base.service";
import { server_path } from "../utils/constant";

export const getJobs = async () => {
  return await getData(server_path.JOB);
};

export const getJobById = async (id) => {
  return await getDataByID(server_path.JOB, id);
};
