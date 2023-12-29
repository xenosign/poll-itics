import axios from "axios";

const instance = axios.create({
  baseURL: "http://15.164.228.29:3001/",
});

export default instance;
