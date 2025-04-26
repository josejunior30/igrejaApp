import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findById(id: number) {
    return axios.get(`${BASE_URL}/atendimento/${id}`);
  }
  export function findAll() {
    return axios.get(`${BASE_URL}/atendimento`);
  }
  
  export function insertAtendimento(atendimento: any) {
    return axios.post(`${BASE_URL}/atendimento`, atendimento);
  }


  export function findByProximos() {
    return axios.get(`${BASE_URL}/atendimento/proximos`);
  }
  export function findAllMembros() {
    return axios.get(`${BASE_URL}/membro`);
  }
  export function findAllVisitantes() {
    return axios.get(`${BASE_URL}/visitante`);
  }
  export function findByUltimos() {
    return axios.get(`${BASE_URL}/atendimento/ultimos`);
  }
  export function findByAnoAtual(ano: number = new Date().getFullYear()) {
    return axios.get(`${BASE_URL}/atendimento/ano/${ano}`);
}
export function findByAnoMesAtual(ano: number = new Date().getFullYear(),mes: number = new Date().getMonth()+1) {
    return axios.get(`${BASE_URL}/atendimento/mes/${mes}/ano/${ano}`);
}
export function findByAnoMesAno(ano: number ,mes: number) {
  return axios.get(`${BASE_URL}/atendimento/mes/${mes}/ano/${ano}`);
}
export function findByAno(ano: number ) {
  return axios.get(`${BASE_URL}/atendimento/ano/${ano}`);
}

export function findAllOpcaoAtendimento() {
  return axios.get(`${BASE_URL}/opcao-atendimento`);
}

export function insertOpcaoAtendimento(descricao: any) {
  return axios.post(`${BASE_URL}/opcao-atendimento`, descricao);
}