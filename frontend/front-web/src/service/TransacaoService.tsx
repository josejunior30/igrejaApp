import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/transacao`);
}
export function findAno(ano: number = 2025) {
  return axios.get(`${BASE_URL}/transacao/ano/${ano}`);
}

export function findByAno(ano: number ) {
  return axios.get(`${BASE_URL}/transacao/ano/${ano}`);
}
export function insertTransacao(Transacao: any) {
  return axios.post(`${BASE_URL}/transacao`, Transacao);
}

export function findBybuscarPorDescricao(descricao:string) {
  
    return axios.get(`${BASE_URL}/transacao/buscar?descricao=${descricao}`);
  }
export function updateCalendario(id: number, Calendario: any) {
  return axios.put(`${BASE_URL}/calendario/${id}`, Calendario);
}
export function deleteTransacao(id: number) {
  return axios.delete(`${BASE_URL}/transacao/${id}`);
}

export function findByMesAno(mes: number, ano:number) {
  return axios.get(`${BASE_URL}/transacao/mes/${mes}/ano/${ano}`);
}



