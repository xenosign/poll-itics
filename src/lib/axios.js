import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.105.73:3001/",
});

export default instance;
