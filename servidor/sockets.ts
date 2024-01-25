import { APP_URL } from "servidor/config";
import { Server } from "socket.io";

export function connectSockets(server){
	const io = new Server(server,{
		cors: {
			origin: [APP_URL,"http://localhost:5173"],
    		methods: ["GET", "POST"],
			credentials: false
		}
	});

	io.on("connection", (socket) => {
		console.log("Usuario conectado", socket.id);

		socket.on("addFood", (data) => {
			// console.log("foodAdded", data);

			io.emit("foodAdded", data);
		});

	});

}

