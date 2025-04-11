
import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";



export function findAll(){

    return axios.get(`${BASE_URL}/quantidade`);
}

export function findById(id:number){

    return axios.get(`${BASE_URL}quantidade/${id}`);
}
export function insertQuantidade(QuantidadePorCulto:any){
    return axios.post(`${BASE_URL}/quantidade`, QuantidadePorCulto);
}

export function updateMembro(id: number, MembroDTO:any){
    return axios.put(`${BASE_URL}/quantidade/${id}`, MembroDTO);
}
export function deleteQuantidade(id: number) {
    return axios.delete(`${BASE_URL}/quantidade/${id}`);
}
export function cultoPorMes(mes: number) {
    return axios.get(`${BASE_URL}/quantidade/mes/${mes}`);
  }
  export function getMediaTotal(ano: number, tipoCulto: string) {
    return axios.get(`${BASE_URL}/quantidade/media/${ano}/${tipoCulto}`);
}