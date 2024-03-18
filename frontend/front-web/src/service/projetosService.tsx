
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { projetosDTO } from "../models/projetos";

export function findAll():Promise<AxiosResponse<projetosDTO[]>>{
    return axios.get(`${BASE_URL}/projetos`);
}

export function findById(id:number):Promise<AxiosResponse<projetosDTO>>{
    return axios.get(`${BASE_URL}/projetos/${id}`);
}