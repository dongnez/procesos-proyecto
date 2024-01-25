import axios from 'axios'
import { WEB_URL } from 'src/constants/config';

export function databaseAgregarUsuario(nick: string) {
    return fetch(`${WEB_URL}/agregarUsuario/${nick}`)
     .then(response => response.json())
      .then(data => data);
}

export function databaseEnviarJWT(user:{email:string,name:string,photoURL:string,provider:string}) {
  return axios.post(`${WEB_URL}/auth/google`, user, {
  headers: {
    'Content-Type': 'application/json' // Configura la cabecera para indicar que estás enviando JSON
  }
})
}