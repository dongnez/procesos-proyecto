import axios from "axios";
import { UserInterface } from "src/interfaces/UserInterfaces";
import { API_URL } from "src/constants/config";

export async function databaseAuthRegister(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await axios.post(`${API_URL}auth/register`, payload, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  });
  return result;
}

export async function databaseAuthLogin(payload: {
  email: string;
  password: string;
}): Promise<{data:null | UserInterface,error:string | null }> {
  let error = null;
  
  const result = await axios.post(`${API_URL}auth/login`, payload, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  }).catch((error_) => {
    // console.log("Lo", error_);
    error = error_.response.data.message;
  });



  return {data:result?.data,error};
}

export async function databaseAuthLogOut(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await axios.post(`${API_URL}auth/logout`, payload, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  });
  return result;
}

export function databaseAuthGoogle(user:{email:string,name:string,photoURL:string,provider:string}) {
  return axios.post(`${API_URL}auth/google`, user, {
  headers: {
    'Content-Type': 'application/json' // Configura la cabecera para indicar que estás enviando JSON
  }
})
}