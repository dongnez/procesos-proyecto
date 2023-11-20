import { Server } from "socket.io";

export function connectSockets(server){
	const io = new Server(server);

	io.on("connection", (socket) => {
		console.log("Usuario conectado", socket.id);

		socket.on("addFood", (data) => {
			console.log("foodAdded", data);

			io.emit("foodAdded", data);
		});

	});

}

