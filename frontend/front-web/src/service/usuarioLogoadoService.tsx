import { BASE_URL } from "../ultilitarios/system";
import axios, { AxiosRequestConfig } from "axios";
import * as authService from '../service/AuthService'
import { requestBackend } from "../models/request";
import { config } from "localforage";

export function findMe(){

    const config: AxiosRequestConfig={
        url: "/user/me",
        withCredentials:true
    }

    return requestBackend(config);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/user/${id}`);
}
export function insert(UserDTO:any){
    return axios.post(`${BASE_URL}/user`, UserDTO);
}