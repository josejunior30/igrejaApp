import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { StatusRequerimento } from "../models/requerimentoOrçamento";




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

export async function updateStatus(id: number, statusRequerimento: string) {
    try {
        const response = await axios.put(`${BASE_URL}/requerimento/${id}/status?newStatus=${statusRequerimento}`);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        throw error; // Lança o erro novamente para o tratamento em outro lugar
    }
}

export async function deleteRequerimento(id: number) {

    return axios.delete(`${BASE_URL}/requerimento/${id}`);
}
