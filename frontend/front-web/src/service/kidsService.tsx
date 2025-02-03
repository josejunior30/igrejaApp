import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/kids`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/kids/${id}`);
}
export function insertKids(MembroDTO: any) {
  return axios.post(`${BASE_URL}/kids`, MembroDTO);
}

export function updateKids(id: number, MembroDTO: any) {
  return axios.put(`${BASE_URL}/kids/${id}`, MembroDTO);
}
export function deleteKids(id: number) {
  return axios.delete(`${BASE_URL}/kids/${id}`);
}
export function findByNome(nome: string) {
  return axios.get(`${BASE_URL}/kids/search?nome=${nome}`);
}

export function findByMonthOfBirth(mes: number) {
  return axios.get(`${BASE_URL}/kids/por-mes?mes=${mes}`);
}
