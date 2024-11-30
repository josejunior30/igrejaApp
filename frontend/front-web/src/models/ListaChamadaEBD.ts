import { curso } from "./trilha";

export type ListaChamadaEBD = {
  id: number;
  data: Date;
  chamadaVisitante: number;
  chamadaMembro: number;
  curso: curso;
  membro: Membro;
  visitante: Visitante;
};
export type Membro = {
  id: number;
  nome: string;
};
export type Visitante = {
  id: number;
  nome: string;
};
