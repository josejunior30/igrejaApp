
import React from "react";
import { BASE_URL } from "../ultilitarios/system";
import axios from "axios";


export function findAll(){

    return axios.get(`${BASE_URL}/chamada`);
}

export function findAlunosByDate(dataEscolhida: Date) {
    // Supondo que dataEscolhida seja uma string no formato "YYYY-MM-DD"
    const formattedDate = dataEscolhida.toISOString().split('T')[0]; // Formata a data para o formato "YYYY-MM-DD"
    return axios.get(`${BASE_URL}/chamada/data?data=${formattedDate}`);
}
