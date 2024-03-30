import React from "react";
import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";


export function findAll(){

    return axios.get(`${BASE_URL}/user`);
}

export function findById(id:number){
    return axios.get(`${BASE_URL}/user/${id}`);
}
export function insert(UserDTO:any){
    return axios.post(`${BASE_URL}/user`, UserDTO);
}