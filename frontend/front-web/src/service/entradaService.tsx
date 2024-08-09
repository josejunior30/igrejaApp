import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { EntradaPG } from "../models/pagamento";

export function findAll(){
    return axios.get(`${BASE_URL}/entrada`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/entrada/${id}`);
}
export function insertEntradaPG(entradaPG: EntradaPG) {
    return axios.post(`${BASE_URL}/entrada`, entradaPG);
}
export function updateEntradaPG(id: number, entradaPG:EntradaPG){
    return axios.put(`${BASE_URL}/entrada/${id}`, entradaPG);
}

export function deleteEntradaPG(id: number) {
    return axios.delete(`${BASE_URL}/entrada/${id}`);
}

export function findByMes(mesReferencia: string) {
    
    return axios.get(`${BASE_URL}/entrada/mes/${mesReferencia}`);
}