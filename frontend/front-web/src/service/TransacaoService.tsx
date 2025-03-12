import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";
import * as authService from "../service/AuthService";
export function findAll() {
  return axios.get(`${BASE_URL}/transacao`);
}
export function findAno(ano: number = 2025) {
  return axios.get(`${BASE_URL}/transacao/ano/${ano}`);
}

export function findByAno(ano: number) {
  return axios.get(`${BASE_URL}/transacao/ano/${ano}`);
}

export async function insertTransacao(transacao: any) {
  if (!authService.hasAnyRoles(["ROLE_FINANCA"])) {
      alert("Acesso negado: Você não tem permissão para realizar esta ação.");
      throw new Error("Acesso negado: Você não tem permissão para realizar esta ação.");
  }

  try {
      const token = authService.getAccessToken(); 
      const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      };

      const response = await axios.post(
          `${BASE_URL}/transacao`,
          transacao,
          { headers }
      );

      return response.data;
  } catch (error) {
      console.error("Erro ao inserir pagamento:", error);
      throw error;
  }
}

export function findBybuscarPorDescricao(
  descricao: string,
  mes?: number,
  ano?: number
) {
  let url = `${BASE_URL}/transacao/buscar?descricao=${descricao}&ano=${ano}`;
  if (mes) {
    url += `&mes=${mes}`;
  }
  return axios.get(url);
}


export function deleteTransacao(id: number) {
  return axios.delete(`${BASE_URL}/transacao/${id}`);
}

export function findByMesAno(mes: number, ano: number) {
  return axios.get(`${BASE_URL}/transacao/mes/${mes}/ano/${ano}`);
}
