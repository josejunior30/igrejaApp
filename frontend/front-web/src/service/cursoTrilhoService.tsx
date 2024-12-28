import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findById(id: number) {
  return axios.get(`${BASE_URL}/curso-trilho/${id}`);
}
export function findAllCurso() {
  return axios.get(`${BASE_URL}/curso-trilho`);
}
