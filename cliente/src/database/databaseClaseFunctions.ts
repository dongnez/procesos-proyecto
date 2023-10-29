import axios from 'axios'
import { API_URL } from 'src/constants/config';

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

export function databaseEnviarJWT(jwt:any) {
  return axios.post(`${API_URL}enviarJwt`, jwt, {
  headers: {
    'Content-Type': 'application/json' // Configura la cabecera para indicar que estás enviando JSON
  }
})
}