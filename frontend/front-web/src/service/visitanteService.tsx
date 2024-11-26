import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/visitante`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/visitante/${id}`);
}
export function insertVisitante(visitante: any) {
  return axios.post(`${BASE_URL}/visitante`, visitante);
}

export function updateVisitante(id: number, visitante: any) {
  return axios.put(`${BASE_URL}/visitante/${id}`, visitante);
}
export function deleteMembro(id: number) {
  return axios.delete(`${BASE_URL}/visitante/${id}`);
}
export function findByNome(nome: string) {
  return axios.get(`${BASE_URL}/visitante/search?nome=${nome}`);
}

export function patchUpdateCurso(visitanteId: number, cursoId: number) {
  return axios.patch(`${BASE_URL}/visitante/${visitanteId}/curso/${cursoId}`);
}
