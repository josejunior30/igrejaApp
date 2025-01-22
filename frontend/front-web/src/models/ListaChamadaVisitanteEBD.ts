import { ebdCurso } from "./trilha";

export type ListaChamadaVisitanteEBD = {
  id: number;
  data: Date;
  chamadaVisitante: ChamadaVisitante;
  ebdCurso: ebdCurso;
  visitante: Visitante;
};

export type Visitante = {
  id: number;
  nome: string;
};
export enum ChamadaVisitante {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  JUSTIFICADO = "JUSTIFICADO",
}
