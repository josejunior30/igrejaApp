import { projetosDTO } from "./projetos";

export type alunosDTO={
  
    id:number;
    nome: string;
    dataNascimento:Date;
    idade:string;
	  rg: string;
    responsavel: string;
	  cpfResponsavel: string;
    telefone: string;
    url: string;
    rua: string;
    cep: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
	projetos: projetos;
    chamada:chamada;
}

export type projetos = {
    
    id: number;
    nome: string;
   
  };

 export type chamada = {
    id: number;
    chamadaAluno: number;
 }