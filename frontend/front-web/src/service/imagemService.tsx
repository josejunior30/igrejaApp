import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../ultilitarios/system";
import { Foto } from "../models/foto";

export function updateImagem(file:any) :Promise<AxiosResponse<Foto>> {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${BASE_URL}/api/files/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}