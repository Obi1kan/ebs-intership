import axios from 'axios';

// require("dotenv").config();

export const mainAxios = axios.create({
  baseURL: 'http://localhost:3002/',
});
