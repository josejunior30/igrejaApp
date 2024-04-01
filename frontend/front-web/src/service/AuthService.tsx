import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../ultilitarios/system";
import *as accessTokenRepository from '../localstorage/access-token-repository'
import { save } from "../localstorage/access-token-repository";


export async function loginRequest(loginData: CredentialsDTO) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }
    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

    try {
        const response = await fetch(`${BASE_URL}/oauth2/token`, {
            method: 'POST',
            headers: headers,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer a solicitação');
        }

        const data = await response.json();
        return data.access_token; // Retorna o token de acesso
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error; // Lança o erro para que seja tratado pelo chamador, se necessário
    }
}

export async function customLoginRequest(credentials: CredentialsDTO) {
    try {
        // Chamando a função existente para fazer a solicitação de login
        const token = await loginRequest(credentials);

        // Manipulando os dados de resposta conforme necessário
        if (token) {
            save(token);
            return { success: true, token }; // ou qualquer outra coisa que você deseje retornar em caso de sucesso
        } else {
            return { success: false, error: 'Erro ao fazer a solicitação' }; // ou tratamento de erro adequado
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return { success: false, error }; // ou tratamento de erro adequado
    }
}
export function logout(){
    accessTokenRepository.remove();
}
export function saveAccessToken(token: string){
    accessTokenRepository.save(token);
}
export function getAccessToken(){
    return accessTokenRepository.get();
}

export function requireAuth(nextState: any, replace: any) {
    const token = getAccessToken(); // Obtém o token de acesso do armazenamento local

    if (!token) {
        // Se não houver token de acesso, redirecione para a página de login
        replace('/login');
    }
}