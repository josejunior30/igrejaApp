import { curso } from "./trilha";

export type MembroDTO = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  idade: number;
  dataNascimento: Date;
  telefone: string;
  cpf: string;
  estadoCivil: number;
  rua: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  numero: number;
  status: boolean;
  curso: curso;
  opcaoCurso: string;
  apostila: boolean;
};
export type MembrosDTO = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  cpf: string;
  estadoCivil: number;
  rua: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  numero: number;
};
