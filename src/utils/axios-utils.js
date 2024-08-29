import axios from "axios";

// For localhost
const client = axios.create({ baseURL: "http://localhost:3000/v1" });

// You need to change this url with your own url where you will deply your backend
// const client = axios.create({
//   baseURL: "https://asset-management-a7a653196153.herokuapp.com/v1",
// });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.error("Request error:", error.response?.data || error.message);
    throw error.response?.data || error.message; // Throw the error to propagate it
  };

  return client(options).then(onSuccess).catch(onError);
};
