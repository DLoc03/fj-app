import {
  getData,
  postData,
  getDataByToken,
  updateData,
} from "../api/base.service";

import { server_path } from "../api/path.service";

export const getAllCompanies = async () => {
  return await getData(server_path.GETCOMPANIES);
};
