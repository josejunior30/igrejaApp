import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/membro`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/membro/${id}`);
}
export function insertMembro(MembroDTO: any) {
  return axios.post(`${BASE_URL}/membro`, MembroDTO);
}

export function updateMembro(id: number, MembroDTO: any) {
  return axios.put(`${BASE_URL}/membro/${id}`, MembroDTO);
}
export function deleteMembro(id: number) {
  return axios.delete(`${BASE_URL}/membro/${id}`);
}
export function findByNome(nome: string) {
  return axios.get(`${BASE_URL}/membro/search?nome=${nome}`);
}

export function patchUpdateCurso(membroId: number, cursoId: number) {
  return axios.patch(`${BASE_URL}/membro/${membroId}/curso/${cursoId}`);
}
