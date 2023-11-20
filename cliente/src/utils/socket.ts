import { io } from "socket.io-client";
import { WEB_URL } from "src/constants/config";


console.log("WEB_URL", WEB_URL);
export const socket = io(WEB_URL)