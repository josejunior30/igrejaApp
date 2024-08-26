import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import * as authService from '../service/AuthService';
import { AlunoPG } from "../models/pagamento";


export function findAll(){
    return axios.get(`${BASE_URL}/alunos`);
}
export function findAllAlunos(){
    return axios.get(`${BASE_URL}/alunos/todos`);
}


export function findById(id:number){
    return axios.get(`${BASE_URL}/alunos/${id}`);
}


export function insertAluno(alunosDTO:any){
    return axios.post(`${BASE_URL}/alunos`, alunosDTO);
}
export function updateMembro(id: number, alunosDTO:any){
    return axios.put(`${BASE_URL}/alunos/${id}`, alunosDTO);
}

export async function deleteMembro(id: number) {
    
    // Verifica se o usuário tem a role 'ROLE_ADMIN'
    if (!authService.hasAnyRoles(['ROLE_ADMIN'])) {
        alert('Acesso negado: Você não tem permissão para realizar esta ação.');
        throw new Error('Acesso negado: Você não tem permissão para realizar esta ação.');
    }

    try {
        const response = await axios.delete(`${BASE_URL}/alunos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        throw error;
    }
}
export function findByNome(nome:string){

    return axios.get(`${BASE_URL}/alunos/search?nome=${nome}`);
}
export function findByHorario(horario: string) {
    return axios.get(`${BASE_URL}/alunos/searchByHorario?horario=${horario}`);
}
export function findByProjeto(projetoId: number) {
    return axios.get(`${BASE_URL}/alunos/searchByProjeto?projetoId=${projetoId}`);
}
export function findByProjetoAndHorario(projetoId: number, horario: string) {
    return axios.get(`${BASE_URL}/alunos/searchByProjetoAndHorario?projetoId=${projetoId}&horario=${horario}`);
}