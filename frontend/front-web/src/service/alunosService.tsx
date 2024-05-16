import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { alunosDTO } from "../models/alunos";


export function findAll():Promise<AxiosResponse<alunosDTO[]>>{
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