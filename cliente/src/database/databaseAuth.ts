import axios from "axios";
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
