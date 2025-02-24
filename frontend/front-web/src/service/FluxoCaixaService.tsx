import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";


export function findByFluxoMes(mes: number, ano:number) {
  return axios.get(`${BASE_URL}/fluxo-caixa/${mes}/${ano}`);
}


export function findByMesAnoAcumulado(mes:number, ano:number) {
   
  return axios.get(`${BASE_URL}/fluxo-caixa/acumulado/${mes}/${ano}`);
}