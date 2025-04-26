import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { getAccessToken } from "./AuthService";
import * as authService from '../service/AuthService';
import { StatusPagamento } from "../models/contaPagar";

export function findAllContaPagar() {
  return axios.get(`${BASE_URL}/contaPagar`);
}
export function findAllDescricao() {
  return axios.get(`${BASE_URL}/descricao-conta`);
}

export async function insertContaPagar(ContaPagar: any) {
  const token = getAccessToken();
 if (!authService.hasAnyRoles(['ROLE_FINANCA'])) {
        alert('Acesso negado: Você não tem permissão para realizar esta ação.');
        throw new Error('Acesso negado: Você não tem permissão para realizar esta ação.');
    }
  if (!token) {
    throw new Error("Token de acesso não encontrado");
  }

  const config: AxiosRequestConfig = {
    method: "POST",
    url: `${BASE_URL}/contaPagar`,
    data: ContaPagar,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Erro ao inserir conta a pagar:", error);
    throw error;
  }
}
export async function updateStatus(id: number, status: StatusPagamento) {
  if (!id || status === undefined) {
    throw new Error("ID e Status são obrigatórios para atualizar a conta.");
  }

  const token = getAccessToken();
  if (!token) {
    throw new Error("Token de acesso não encontrado.");
  }

  try {
    const response = await axios.patch(
      `${BASE_URL}/contaPagar/${id}/status`,
      status, // Enviando apenas o valor, não um objeto
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro ao atualizar status:", error.response.data);
      throw new Error(error.response.data.message || "Erro ao atualizar status");
    } else if (error.request) {
      throw new Error("Falha na comunicação com o servidor.");
    } else {
      throw new Error("Erro inesperado: " + error.message);
    }
  }
}


export function findByDescricaoMesAndAno(
  mes: number,
  ano: number,
  descricaoConta: string
) {
  return axios.get(
    `${BASE_URL}/contaPagar/buscar-por-data?descricaoConta=${descricaoConta}&mes=${mes}&ano=${ano}`
  );
}

export function findByDescricaoAno(ano: number, descricaoConta: string) {
  return axios.get(
    `${BASE_URL}/contaPagar/buscar-por-ano?descricaoConta=${descricaoConta}&ano=${ano}`
  );
}
export function findByMesAno(ano: number, mes: number) {
  return axios.get(
    `${BASE_URL}/contaPagar/buscar-por-data-criacao?mes=${mes}&ano=${ano}`
  );
}
export async function deleteContaPagar(id: number) {

  return axios.delete(`${BASE_URL}/contaPagar/${id}`);
}

export function insertDescricaoConta(descricao: any) {
  return axios.post(`${BASE_URL}/descricao-conta`, descricao);
}