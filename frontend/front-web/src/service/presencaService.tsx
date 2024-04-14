
import React from "react";
import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";
import { PresencaDTO } from "../models/presenca";


export function findAll(){

    return axios.get(`${BASE_URL}/chamada`);
}

export function findByDate(dataEscolhida: Date) {
    
    const formattedDate = dataEscolhida.toISOString().split('T')[0]; 
    return axios.get(`${BASE_URL}/chamada/data?data=${formattedDate}`);
}

export function findDataAndProjeto(dataEscolhida: Date, projeto: number) {
    const formattedDate = dataEscolhida.toISOString().split('T')[0]; 
    return axios.get(`${BASE_URL}/chamada/dataProjeto?data=${formattedDate}&projeto=${projeto}`);
}
export function insert(PresencaDTO:PresencaDTO){
   
    return axios.post(`${BASE_URL}/chamada`, PresencaDTO);

    
}
