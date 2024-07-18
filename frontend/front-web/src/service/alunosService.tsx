import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";



export function findAll(){
    return axios.get(`${BASE_URL}/alunos`);
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
export function deleteMembro(id: number) {
    return axios.delete(`${BASE_URL}/alunos/${id}`);
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