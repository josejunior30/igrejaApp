import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../ultilitarios/system";

export async function loginRequest(loginData: CredentialsDTO){
    const headers ={
        "Content-Type":"application/x-www-form-urlencoded",
        Authorization:"Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
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
        console.log(data); // Faça o que precisar com os dados da resposta
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}