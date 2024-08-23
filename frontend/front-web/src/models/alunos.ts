import { Pagamento } from "./pagamento";


export type alunosDTO={
  
    id:number;
    nome: string;
    dataNascimento:Date;
    idade: number;
	  rg: string;
    responsavel: string;
	  cpfResponsavel: string;
    telefone: string;
    horario: string;
    url: string;
    rua: string;
    cep: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
	projetos: projetos;
   email: string;
    AlunoDoenca:number;
    sangue: string;
    pergunta: string;
    grauParentesco:string;
    ativo: string;
    
    
}
export type alunosPG={
  
    id:number;
    nome: string;
    dataNascimento:Date;
    idade: number;
	  rg: string;
    responsavel: string;
	  cpfResponsavel: string;
    telefone: string;
    horario: string;
    url: string;
    rua: string;
    cep: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
	projetos: projetos;
   email: string;
    AlunoDoenca:number;
    sangue: string;
    pergunta: string;
    grauParentesco:string;
    ativo: string;
    pagamento: Pagamento;
    
}
export type alunoDTO={
  
    id:number;
    nome: string;
    dataNascimento:Date;
  email:string;
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
    horario: string;
    grauParentesco:string;
    AlunoDoenca:number;
    sangue: string;
    pergunta: string;
}
export type projetos = {
    
    id: number;
    nome: string;
   
  };
  