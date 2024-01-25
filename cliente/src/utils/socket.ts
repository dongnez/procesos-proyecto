import { io } from "socket.io-client";
import { WEB_URL } from "src/constants/config";


export const socket = io(WEB_URL)