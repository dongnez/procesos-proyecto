import axios from "axios";
import { WEB_URL } from "../constants/config";

const instance = axios.create({
	baseURL: WEB_URL,
  	withCredentials: true,
});

export default instance; 