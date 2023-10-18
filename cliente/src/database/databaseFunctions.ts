// import $ from 'jquery'

const SERVER_NAME = window.location.hostname;
const SERVER_PORT = import.meta.env.PORT || "3000"; // Puedes definir el puerto necesario
const API_URL = SERVER_NAME === "localhost" ? `http://${SERVER_NAME}:${SERVER_PORT}/` :`https://${SERVER_NAME}/`;
console.log(API_URL,SERVER_NAME,SERVER_PORT);

  export function databaseAgregarUsuario(nick: string) {
    return fetch(`${API_URL}agregarUsuario/${nick}`)
     .then(response => response.json())
      .then(data => data);
}

export function databaseEliminarUsuario(nick: string) {
  return fetch(`${API_URL}eliminarUsuario/${nick}`)
     .then(response => response.json())
      .then(data => data);
}

export function databaseObtenerUsuarios() {
  return fetch(`${API_URL}obtenerUsuarios`)
     .then(response => response.json())
      .then(data => data);
}
