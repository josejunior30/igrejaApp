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

