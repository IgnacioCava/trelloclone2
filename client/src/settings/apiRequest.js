import axios from "axios";

const baseURL = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin' : '*'
  }
});

export default baseURL