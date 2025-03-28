import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findById(id: number) {
    return axios.get(`${BASE_URL}/atendimento/${id}`);
  }
  export function findAll() {
    return axios.get(`${BASE_URL}/atendimento`);
  }
  
  export function insertAluno(atendimento: any) {
    return axios.post(`${BASE_URL}/atendimento`, atendimento);
  }
  export function findByAno(ano: number) {
    return axios.get(`${BASE_URL}/atendimento/ano/${ano}`);
  }
  export function findByAnoAtual(ano: number = new Date().getFullYear()) {
    return axios.get(`${BASE_URL}/atendimento/ano/${ano}`);
}
export function findByAnoMesAtual(ano: number = new Date().getFullYear(),mes: number = new Date().getMonth()+1) {
    return axios.get(`${BASE_URL}/atendimento/mes/${mes}/ano/${ano}`);
}
