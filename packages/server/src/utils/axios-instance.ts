import axios from "axios";

require("dotenv").config();

export const mainAxios = axios.create({
  baseURL: process.env.URL,
});
