import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-server-beot.onrender.com/api",
});

export default API;