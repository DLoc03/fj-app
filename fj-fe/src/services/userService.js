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
  console.log("Data: ", res);
  return res;
};

export const UserUpdate = async (id, data) => {
  const userData = sessionStorage.getItem("User");
  if (!userData) {
    console.error("User data is missing! User needs to log in.");
    return;
  }

  const parsedUserData = JSON.parse(userData);
  const accessToken = parsedUserData.accessToken;

  if (!accessToken) {
    console.error("AccessToken is missing! User needs to log in.");
    return;
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.errCode === 0) {
      const updatedUserData = {
        ...parsedUserData,
        user: { ...parsedUserData.user, ...data },
      };

      sessionStorage.setItem("User", JSON.stringify(updatedUserData));

      console.log("User data updated successfully:", updatedUserData);
    }

    return res;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
