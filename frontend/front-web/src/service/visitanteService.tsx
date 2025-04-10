import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/visitante`);
}
export function findAllVisitante() {
  return axios.get(`${BASE_URL}/visitante`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/visitante/${id}`);
}
export function insertVisitante(visitante: any, cursoId: number) {
  return axios.post(`${BASE_URL}/visitante/com-curso/${cursoId}`, visitante);
}
export function insertVisitanteNotCurso(visitante: any) {
  return axios.post(`${BASE_URL}/visitante`, visitante);
}

export function updateVisitante(id: number, visitante: any) {
  return axios.put(`${BASE_URL}/visitante/${id}`, visitante);
}
export function deleteVisitante(id: number) {
  return axios.delete(`${BASE_URL}/visitante/${id}`);
}
export function findByNome(nome: string) {
  return axios.get(`${BASE_URL}/visitante/search?nome=${nome}`);
}
export function findByMonthOfBirth(mes: number) {
  return axios.get(`${BASE_URL}/visitante/por-mes?mes=${mes}`);
}

export function patchUpdateCurso(
  visitanteId: number,
  cursoId: number,
  ebdMembroId: number
) {
  return axios.patch(
    `${BASE_URL}/visitante/${visitanteId}/curso/${cursoId}/ebdCurso/${ebdMembroId}`
  );
}
export function addEbdCurso(visitanteId: number, cursoId: number) {
  return axios.post(`${BASE_URL}/visitante/${visitanteId}/curso/${cursoId}`);
}

export function patchUpdateOpcao(visitanteId: number, opcaoCurso: string) {
  return axios.patch(
    `${BASE_URL}/visitante/${visitanteId}/opcao-curso`,
    opcaoCurso
  );
}
export function patchUpdateApostila(visitanteId: number, apostila: boolean) {
  return axios.patch(
    `${BASE_URL}/visitante/${visitanteId}/opcao-apostila`,
    { apostila }, // Envia o booleano como parte de um objeto
    {
      headers: {
        "Content-Type": "application/json", // Garante o cabeçalho correto
      },
    }
  );
}
export function patchFotoPerfil(id: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.patch(`${BASE_URL}/membro/${id}/foto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
