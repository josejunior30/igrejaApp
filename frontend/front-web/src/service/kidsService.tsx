import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/kids`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/kids/${id}`);
}
export function insertKids(MembroDTO: any) {
  return axios.post(`${BASE_URL}/membro`, MembroDTO);
}

export function updateKids(id: number, MembroDTO: any) {
  return axios.put(`${BASE_URL}/membro/${id}`, MembroDTO);
}
export function deleteKids(id: number) {
  return axios.delete(`${BASE_URL}/membro/${id}`);
}
export function findByNome(nome: string) {
  return axios.get(`${BASE_URL}/membro/search?nome=${nome}`);
}

export function patchUpdateCurso(
  membroId: number,
  cursoId: number,
  ebdMembroId: number
) {
  return axios.patch(
    `${BASE_URL}/membro/${membroId}/curso/${cursoId}/ebdCurso/${ebdMembroId}`
  );
}

export function patchOpcao(membroId: number, opcaoCurso: string) {
  return axios.patch(`${BASE_URL}/membro/${membroId}/opcao-curso`, opcaoCurso);
}

export function addEbdCurso(membroId: number, cursoId: number) {
  return axios.post(`${BASE_URL}/membro/${membroId}/curso/${cursoId}`);
}

export function findByMonthOfBirth(mes: number) {
  return axios.get(`${BASE_URL}/membro/por-mes?mes=${mes}`);
}

export function patchApostila(membroId: number, apostila: boolean) {
  return axios.patch(
    `${BASE_URL}/membro/${membroId}/opcao-apostila`,
    { apostila }, // Envia o booleano como parte de um objeto
    {
      headers: {
        "Content-Type": "application/json", // Garante o cabeçalho correto
      },
    }
  );
}
