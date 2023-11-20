export const SERVER_NAME = window.location.hostname;
export const SERVER_PORT = import.meta.env.PORT || 8080; // Puedes definir el puerto necesario
export const WEB_URL = import.meta.env.APP_URL ||  SERVER_NAME === "localhost" ? `http://${SERVER_NAME}:${SERVER_PORT}/` :`https://${SERVER_NAME}/`;