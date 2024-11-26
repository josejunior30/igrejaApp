import { curso } from "./trilha";

export type visitante = {
  id: number;
  nome: string;
  email: string;
  idade: number;
  telefone: string;
  dataNascimento: Date;
  curso: curso;
};
