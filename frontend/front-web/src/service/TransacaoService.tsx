import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/calendario`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/calendario/${id}`);
}
export function insertTransacao(Transacao: any) {
  return axios.post(`${BASE_URL}/transacao`, Transacao);
}

export function updateCalendario(id: number, Calendario: any) {
  return axios.put(`${BASE_URL}/calendario/${id}`, Calendario);
}
export function deleteTransacao(id: number) {
  return axios.delete(`${BASE_URL}/transacao/${id}`);
}

export function findByResponsavel(responsavel: string) {
  return axios.get(`${BASE_URL}/calendario/responsavel/${responsavel}`);
}
export function findByTitulo(titulo: string) {
  return axios.get(`${BASE_URL}/calendario/titulo/${titulo}`);
}