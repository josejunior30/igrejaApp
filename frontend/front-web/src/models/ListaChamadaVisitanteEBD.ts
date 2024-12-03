import { curso } from "./trilha";

export type ListaChamadaVisitanteEBD = {
  id: number;
  data: Date;
  chamadaVisitante: number;
  curso: curso;
  visitante: Visitante;
};

export type Visitante = {
  id: number;
  nome: string;
};
