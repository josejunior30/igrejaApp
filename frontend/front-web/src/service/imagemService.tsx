import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { Foto } from "../models/foto";

export async function uploadImagem(membroId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('membroId', membroId.toString());

    try {
        const response = await axios.post(`${BASE_URL}/api/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Resposta do serviço:', response.data);
        return response.data;
    

    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        throw new Error('Falha ao enviar a imagem. Por favor, tente novamente.'); // Mensagem de erro mais descritiva
    }
}

