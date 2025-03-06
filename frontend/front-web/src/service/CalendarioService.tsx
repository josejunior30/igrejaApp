import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/calendario`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/calendario/${id}`);
}

export function findByAno(ano: number) {
  return axios.get(`${BASE_URL}/calendario/ano/${ano}`);
}
export function insertCalendario(Calendario: any) {
  return axios.post(`${BASE_URL}/calendario`, Calendario);
}

export function updateCalendario(id: number, Calendario: any) {
  return axios.put(`${BASE_URL}/calendario/${id}`, Calendario);
}
export function deleteCalendario(id: number) {
  return axios.delete(`${BASE_URL}/calendario/${id}`);
}

export function findByResponsavel(responsavel: string) {
  return axios.get(`${BASE_URL}/calendario/responsavel/${responsavel}`);
}
export function findByTitulo(titulo: string) {
  return axios.get(`${BASE_URL}/calendario/titulo/${titulo}`);
}