import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll(){
    return axios.get(`${BASE_URL}/pagamento`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/pagamento/${id}`);
}
export function insertPagamento(alunosDTO:any){
    return axios.post(`${BASE_URL}/pagamento`, alunosDTO);
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
