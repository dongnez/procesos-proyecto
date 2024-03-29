import axios from "src/api/axios";
import { UserInterface } from "src/interfaces/UserInterfaces";
import { WEB_URL } from "src/constants/config";

export async function databaseAuthRegister(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const error = await axios.post(`${WEB_URL}/auth/register`, payload, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  }).then(() => {
    return null
  }).catch((error_) => {
    console.log("Error", error_);
    throw error_.response.data;
  })

  return error;
}

export async function databaseSendEmailVerification(payload: {
  email: string;
}) {
  const result = await axios.post(`${WEB_URL}/auth/enviarEmail`, payload, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  });
  return result;
}

export async function databaseAuthLogin(payload: {
  email: string;
  password: string;
}): Promise<{data:null | UserInterface ,error:any }> {
  let error = null;
  
  const result = await axios.post(`${WEB_URL}/auth/login`, payload).catch((error_) => {
    if(!error_){
      throw "Se ha producido un error intentelo más tarde"
    }
    
    throw error_.response.data;
  });
  

  //Check if response set a cookie token
  console.log("Result",result) 

  return {data:result?.data,error};
}

export async function databaseAuthLogOut() {
  const result = await axios.post(`${WEB_URL}/auth/logout`, {}, {
    headers: {
      "Content-Type": "application/json", // Configura la cabecera para indicar que estás enviando JSON
    },
  });
  return result;
}

export function databaseAuthGoogle(user:{email:string,name:string,photoURL:string,provider:string}) {
  return axios.post(`${WEB_URL}/auth/google`, user, {
  headers: {
    'Content-Type': 'application/json' // Configura la cabecera para indicar que estás enviando JSON
  }
})
}