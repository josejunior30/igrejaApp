import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { OrdemServico } from "../models/ordemServico";

export function findById(id: number) {
    return axios.get(`${BASE_URL}/ordens-servico/${id}`);
  }
  export function findAll() {
    return axios.get(`${BASE_URL}/ordens-servico`);
  }
  
  export function insertOrdem(ordemServico: OrdemServico) {
    return axios.post(`${BASE_URL}/ordens-servico`, ordemServico);
  }


export function patchMaterial(id: number, checkInConfirmado: boolean) {
  return axios.patch(`${BASE_URL}/materiais/${id}/checkin`, {
    checkInConfirmado,
  });
}
export function atualizarStatusServico(id: number, novoStatus: string) {
  return axios.patch(`${BASE_URL}/servicos/${id}/status`, novoStatus, {
    headers: { 'Content-Type': 'application/json' }
  });
}


