import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";
import { ListaChamadaEBD } from "../models/ListaChamadaEBD";

export function findAll() {
  return axios.get(`${BASE_URL}/presenca`);
}

export function insert(ListaChamadaEBD: ListaChamadaEBD) {
  return axios.post(`${BASE_URL}/presenca`, ListaChamadaEBD);
}
export function findById(id: number) {
  return axios.get(`${BASE_URL}/presenca/${id}`);
}
export function findMembroByMonthAndCurso(
  mesEscolhido: number,
  anoEscolhido: number,
  cursoId: number
) {
  return axios.get(
    `${BASE_URL}/presenca/listas-presenca?ano=${anoEscolhido}&mes=${mesEscolhido}&cursoId=${cursoId}`
  );
}
