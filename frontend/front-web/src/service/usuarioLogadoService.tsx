
import axios, { AxiosRequestConfig } from "axios";

import { requestBackend } from "../models/request";
import { BASE_URL } from "../ultilitarios/system";
import { getAccessToken } from "./AuthService";


export function findMe(){

    const config: AxiosRequestConfig={
        url: "/user/me",
        withCredentials:true
    }

    return requestBackend(config);
}


export function update(credentialsDTO: any) {
    const { oldPassword, newPassword } = credentialsDTO;
    const url = `${BASE_URL}/user/me/password?oldPassword=${oldPassword}&newPassword=${newPassword}`;

    const token = getAccessToken(); // Obter o token de autenticação
    const headers = {
        Authorization: `Bearer ${token}` // Incluir o token no cabeçalho da requisição
    };

    const config: AxiosRequestConfig = {
        method: 'put',
        url,
        data: credentialsDTO,
        headers
    };

    return axios(config);
}