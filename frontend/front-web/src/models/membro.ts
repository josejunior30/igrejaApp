



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
  url: string;
  desligamento: Date;
  ano: number;
  membroStatus: string;
  membroTipo: string;
  ebdCurso: EbdCurso[];
  opcaoCurso: string;
  apostila: boolean;
  cargoMembro:CargoMembro[];
};

interface EbdCurso {
  id: number;
  nome: string;
  resumo: string;

}
interface CargoMembro {
  id: number;
  nome: string;
  resumo: string;

}
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
  ano: number;
  membroTipo: string;
  membroStatus: string;
};
