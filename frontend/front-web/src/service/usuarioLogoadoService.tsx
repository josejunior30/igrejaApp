import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";
import * as authService from '../service/AuthService'
import { requestBackend } from "../models/request";

export function findMe(){

    const headers ={
        Authorization: "Bearer " + authService.getAccessToken()
    }

    return requestBackend({ url: `/user/me`, headers});
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/user/${id}`);
}
export function insert(UserDTO:any){
    return axios.post(`${BASE_URL}/user`, UserDTO);
}