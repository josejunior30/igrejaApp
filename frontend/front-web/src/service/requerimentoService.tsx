import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import * as authService from '../service/AuthService';
import { RoleEnum } from "../models/auth";

export function findAll(){
    return axios.get(`${BASE_URL}/requerimento`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/requerimento/${id}`);
}

export function findByMesAno(mes:number,  ano:number){
    return axios.get(`${BASE_URL}/requerimento/mes/${mes}/ano/${ano}`);
}


export async function insertRequerimento(requerimentoOrçamento: any) {
  const token = authService.getAccessToken();
  const allowedRoles: RoleEnum[] = ['ROLE_OPERADOR', 'ROLE_ADMIN', 'ROLE_FINANCA'];

  if (!authService.hasAnyRoles(allowedRoles)) {
    alert('Acesso negado: Você não tem permissão para realizar esta ação.');
    throw new Error('Acesso negado: Você não tem permissão para realizar esta ação.');
  }

  if (!token) {
    throw new Error("Token de acesso não encontrado");
  }

  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${BASE_URL}/requerimento`,
    data: requerimentoOrçamento,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Erro ao inserir requerimento:", error);
    throw error;
  }
}


export function updateRequerimento(id: number, requerimentoOrçamento:any){
    return axios.put(`${BASE_URL}/requerimento/${id}`, requerimentoOrçamento);
}

export async function updateStatus(id: number, statusRequerimento: string) {
    if (!authService.hasAnyRoles(["ROLE_FINANCA"])) { 
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
            {}, 
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
