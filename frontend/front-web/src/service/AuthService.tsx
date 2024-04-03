import QueryString from "qs";
import { CredentialsDTO } from "../models/auth";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "../ultilitarios/system";
import *as accessTokenRepository from '../localstorage/access-token-repository'
import { save } from "../localstorage/access-token-repository";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../models/request";


export async function loginRequest(loginData: CredentialsDTO) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }
    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

   const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth/token",
    data: requestBody,
    headers
   }
return requestBackend(config);

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

