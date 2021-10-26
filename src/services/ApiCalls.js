import Axios from "axios";
import { API_ENDPOINTS } from "../utilities/APIEndpoints";

export const acceptUser = (userId) => {
  return new Promise((resolve, reject) => {
    Axios.post(`${API_ENDPOINTS.ACCEPT_USER}/${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response));
  });
};

export const getDepartments = () => {
  return Axios.get(API_ENDPOINTS.GET_DEPARTMENTS);
};

export const getRoles = (departmentId) => {
  return Axios.get(API_ENDPOINTS.GET_ROLES, { params: { departmentId } });
};

export const addUser = (data) => {
  return Axios.post(API_ENDPOINTS.ADD_USER, data);
};

export const updateUser = (userId, data) => {
  return Axios.put(`${API_ENDPOINTS.UPDATE_USER}/${userId}`, data);
};

export const deleteUser = (userId) => {
  return Axios.delete(`${API_ENDPOINTS.DELETE_USER}/${userId}`);
};
