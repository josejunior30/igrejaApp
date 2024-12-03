import { curso } from "./trilha";

export type ListaChamadaEBD = {
  id: number;
  data: Date;
  chamadaMembro: number;
  curso: curso;
  membro: Membro;
};
export type Membro = {
  id: number;
  nome: string;
};
