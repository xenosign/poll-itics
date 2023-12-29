import axios from "axios";
import { SERVER_IP } from "./ip";

const instance = axios.create({
  baseURL: `${SERVER_IP}:3001/`,
});

export default instance;
