
import axios from "axios";

const apiURL = import.meta.env.VITE_BASE_URL;


export async function registerUser(formData) {
  return axios.post(`${apiURL}/users/signup`, formData);
}


export async function loginUser(formData) {
  return axios.post(`${apiURL}/users/signin`, formData);
}


export async function getLoggedUserData() {
  return axios.get(`${apiURL}/users/profile-data`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}


export async function changePassword(passwordData) {
  const body = {
    password: passwordData.oldPassword,     
    newPassword: passwordData.newPassword, 
  };

  const { data } = await axios.patch(
    `${apiURL}/users/change-password`,
    body,
    {
      headers: { token: localStorage.getItem("userToken") },
    }
  );

  return data;
}


export async function updateProfile(profileData) {
  const { data } = await axios.patch(
    `${apiURL}/users/update-profile`,
    profileData,
    {
      headers: { token: localStorage.getItem("userToken") },
    }
  );

  return data;
}
