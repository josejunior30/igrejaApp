
import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { projetosDTO } from "../models/projetos";

export function findAll(){
    return axios.get(`${BASE_URL}/projetos`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/projetos/${id}`);
}