import axios from "axios";
import { BASE_URL } from "../config";

export const getUsers = async () => {
  const users = await axios.get(`${BASE_URL}/user`);
  return users;
}

export const getUserById = async (userId) => {
  const user = await axios.get(`${BASE_URL}/user/${userId}`);
  return user;
}

export const deleteUser = async (userId) => {
  const resp = await axios.delete(`${BASE_URL}/user/${userId}`);
  return resp;
} 

export const createUser = async (uploadUser) => {
  const user = await axios.post(`${BASE_URL}/user`, uploadUser);
  return user;
}