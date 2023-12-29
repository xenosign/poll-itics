import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.150.139:3001/",
});

export default instance;
