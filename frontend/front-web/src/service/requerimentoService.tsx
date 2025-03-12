import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import * as authService from '../service/AuthService';

export function findAll(){
    return axios.get(`${BASE_URL}/requerimento`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/requerimento/${id}`);
}

export function findByMesAno(mes:number,  ano:number){
    return axios.get(`${BASE_URL}/requerimento/mes/${mes}/ano/${ano}`);
}

export function insertAluno(requerimentoOrçamento:any){
    return axios.post(`${BASE_URL}/requerimento`, requerimentoOrçamento);
}
export function updateRequerimento(id: number, requerimentoOrçamento:any){
    return axios.put(`${BASE_URL}/requerimento/${id}`, requerimentoOrçamento);
}

export async function updateStatus(id: number, statusRequerimento: string) {
    if (!authService.hasAnyRoles(["ROLE_FINANCA"])) { // Certifique-se de que o nome do role está correto!
        alert("Acesso negado: Você não tem permissão para realizar esta ação.");
        throw new Error("Acesso negado: Você não tem permissão para realizar esta ação.");
    }

    try {
        const token = authService.getAccessToken(); // Obtém o token armazenado
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const response = await axios.put(
            `${BASE_URL}/requerimento/${id}/status?newStatus=${statusRequerimento}`,
            {}, // Corpo da requisição vazio
            { headers }
        );

        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        throw error;
    }
}

export async function deleteRequerimento(id: number) {

    return axios.delete(`${BASE_URL}/requerimento/${id}`);
}
