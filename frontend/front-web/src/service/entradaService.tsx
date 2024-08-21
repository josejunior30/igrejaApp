import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { EntradaPG } from "../models/pagamento";
import * as authService from '../service/AuthService';

export function findAll(){
    return axios.get(`${BASE_URL}/entrada`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/entrada/${id}`);
}

export async function insertEntradaPG(entradaPG: EntradaPG) {
    

    // Verifica se o usuário tem a role 'ROLE_ADMIN'
    if (!authService.hasAnyRoles(['ROLE_ADMIN'])) {
        alert('Acesso negado: Você não tem permissão para realizar esta ação.');
        throw new Error('Acesso negado: Você não tem permissão para realizar esta ação.');
    }

    try {
        const response = await axios.post(`${BASE_URL}/entrada`, entradaPG);
        return response.data;
    } catch (error) {
        console.error('Erro ao inserir entrada:', error);
        throw error;
    }
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