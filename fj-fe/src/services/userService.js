import axios from "axios";

export const UserLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    data
  );
  console.log("Data login: ", data);
  console.log("Data: ", res);
  return res;
};

export const UserRegister = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    data
  );
  console.log("Data register: ", data);
  console.log("Data: ", res);
  return res;
};
