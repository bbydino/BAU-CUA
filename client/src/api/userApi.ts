import axios from "axios";
import { UserState } from "../store/slices/userSlice";
import { API_ENDPOINT } from "../util";

function getUserById(userId: string) {
  return axios.get(`${API_ENDPOINT}/user/${userId}`);
}

function createUser(user: UserState) {
  return axios.post(`${API_ENDPOINT}/user`, user);
}

function updateUserById(userId: string, updatedUser: UserState) {
  return axios
    .put(`${API_ENDPOINT}/user/${userId}`, updatedUser)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}

function deleteUserById(userId: string) {
  return axios
    .delete(`${API_ENDPOINT}/user/${userId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}

export { createUser, deleteUserById, getUserById, updateUserById };
