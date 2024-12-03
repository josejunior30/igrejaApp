import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";
import { ListaChamadaVisitanteEBD } from "../models/ListaChamadaVisitanteEBD";

export function findAll() {
  return axios.get(`${BASE_URL}/presencaVisitante`);
}

export function insertPresencaVisitante(
  ListaChamadaVisitanteEBD: ListaChamadaVisitanteEBD
) {
  return axios.post(`${BASE_URL}/presencaVisitante`, ListaChamadaVisitanteEBD);
}
export function findById(id: number) {
  return axios.get(`${BASE_URL}/presencaVisitante/${id}`);
}

export function findVisitanteByMonthAndCurso(
  mesEscolhido: number,
  anoEscolhido: number,
  cursoId: number
) {
  return axios.get(
    `${BASE_URL}/presencaVisitante/listas-presenca?ano=${anoEscolhido}&mes=${mesEscolhido}&cursoId=${cursoId}`
  );
}
