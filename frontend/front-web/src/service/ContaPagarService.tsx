import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { getAccessToken } from "./AuthService";

export function findAllContaPagar() {
  return axios.get(`${BASE_URL}/contaPagar`);
}

export async function insertContaPagar(ContaPagar: any) {
  const token = getAccessToken();

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

export async function updateStatus(id: number, statusPagamento: string) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/contaPagar/${id}/status`,
      statusPagamento,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    throw error;
  }
}
export function findByDescricaoMesAndAno(
  mes: number,
  ano: number,
  descricao: string
) {
  return axios.get(
    `${BASE_URL}/contaPagar/buscar-por-data?descricao=${descricao}&mes=${mes}&ano=${ano}`
  );
}

export function findByDescricaoAno(ano: number, descricao: string) {
  return axios.get(
    `${BASE_URL}/contaPagar/buscar-por-data?descricao=${descricao}&ano=${ano}`
  );
}
