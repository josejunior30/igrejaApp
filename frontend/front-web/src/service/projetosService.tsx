
import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";


export function findAll(){
    return axios.get(`${BASE_URL}/projetos`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/projetos/${id}`);
}