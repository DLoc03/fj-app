import { getData, getDataByID, deleteDataById } from "../api/base.service";

import { server_path } from "../api/path.service";

export const getAllCompanies = async () => {
  return await getData(server_path.GETCOMPANIES);
};

export const getCompanyById = async (id) => {
  return await getDataByID(server_path.GETCOMPANIES, id);
};

export const deleteCompanyById = async (id) => {
  return await deleteDataById(server_path.GETCOMPANIES, id);
};
