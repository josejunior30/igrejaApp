import axios from "axios";
import { BASE_URL } from "../ultilitarios/system";

export function findAll() {
  return axios.get(`${BASE_URL}/ebd-cursos`);
}

export function downloadPdf(id: number) {
  return axios.get(`${BASE_URL}/ebd-cursos/${id}/download-pdf`);
}

export async function uploadPdf(id: number, file: File, nome: string) {
  if (!id || id <= 0) {
    throw new Error("ID inválido fornecido.");
  }

  if (!file || file.type !== "application/pdf") {
    throw new Error("O arquivo fornecido não é um PDF válido.");
  }

  const formData = new FormData();
  formData.append("cursoId", id.toString());
  formData.append("pdfDeEstudo", file);
  formData.append("nome", nome);

  try {
    const response = await axios.post(`${BASE_URL}/ebd-cursos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      console.log("Dados recebidos:", response.data);
      return response.data; // Retorna os dados completos do estudo criado
    }

    throw new Error("Resposta inesperada do servidor.");
  } catch (error: any) {
    console.error("Erro ao enviar estudo:", error.message);
    const mensagemErro =
      error.response?.data?.message || "Erro ao enviar o PDF. Tente novamente.";
    throw new Error(mensagemErro);
  }
}
