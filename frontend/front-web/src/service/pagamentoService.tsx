import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { Pagamento } from "../models/pagamento";
import * as authService from '../service/AuthService';



export function findAll(){
    return axios.get(`${BASE_URL}/pagamento`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/pagamento/${id}`);
}


export function findPagamentosByAluno(id: number): Promise<Pagamento[]> {
    return axios.get(`${BASE_URL}/pagamento/aluno/${id}`)
                .then(response => response.data); 
}

export async function insertPagamento(pagamento: Pagamento) {
    
    // Verifica se o usuário tem a role 'ROLE_ADMIN'
    if (!authService.hasAnyRoles(['ROLE_ADMIN'])) {
        alert('Acesso negado: Você não tem permissão para realizar esta ação.');
        throw new Error('Acesso negado: Você não tem permissão para realizar esta ação.');
    }

    try {
        const response = await axios.post(`${BASE_URL}/pagamento`, pagamento);
        return response.data;
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        throw error;
    }
}
export function updatePagamento(id: number, alunosDTO:any){
    return axios.put(`${BASE_URL}/pagamento/${id}`, alunosDTO);
}
export function deletePagamento(id: number) {
    return axios.delete(`${BASE_URL}/pagamento/${id}`);
}
export function findByMesAtual(){

    return axios.get(`${BASE_URL}/pagamento/mes`);
}
export function findByMes(mesReferencia: string) {
    
    return axios.get(`${BASE_URL}/pagamento/mes/${mesReferencia}`);
}
export function findPagamentosByMesReferenciaAndProjeto(projetoId: number,mesReferencia:string){
    return axios.get(`${BASE_URL}/pagamento/mes/${mesReferencia}/projeto/${projetoId}`);
}