export const SERVER_NAME = window.location.hostname;
export const SERVER_PORT = import.meta.env.PORT || 3000; // Puedes definir el puerto necesario
export const API_URL = SERVER_NAME === "localhost" ? `http://${SERVER_NAME}:${SERVER_PORT}/` :`https://${SERVER_NAME}/`;