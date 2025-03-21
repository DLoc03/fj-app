import {
  getData,
  postData,
  getDataByToken,
  updateData,
  getDataByID,
} from "../api/base.service";

import { server_path } from "../utils/constant";

export const getAllCompanies = async () => {
  return await getData(server_path.GETCOMPANIES);
};

export const getCompanyById = async (id) => {
  return await getDataByID(server_path.GETCOMPANIES, id);
};
