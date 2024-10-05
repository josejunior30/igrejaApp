import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";




export function findAll(){
    return axios.get(`${BASE_URL}/requerimento`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/requerimento/${id}`);
}


export function insertAluno(requerimentoOrçamento:any){
    return axios.post(`${BASE_URL}/requerimento`, requerimentoOrçamento);
}
export function updateRequerimento(id: number, requerimentoOrçamento:any){
    return axios.put(`${BASE_URL}/requerimento/${id}`, requerimentoOrçamento);
}

export async function deleteMembro(id: number) {

    return axios.delete(`${BASE_URL}/requerimento/${id}`);
}
