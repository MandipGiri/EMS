import Axios from "axios";
import { BASE_URL } from "../APIEndpoints";

export const SetupAxios = (showToastMessage, logout) => {
  Axios.defaults.baseURL = BASE_URL;
  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("errorMAIN", error.response);
      showToastMessage(error.response.data, "error");
      if (error.response.status === 401) logout();
      return Promise.reject(error);
    }
  );
};
