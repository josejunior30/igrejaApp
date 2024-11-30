import { curso } from "./trilha";

export type visitante = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  idade: number;
  telefone: string;
  dataNascimento: Date;
  curso: curso;
};
