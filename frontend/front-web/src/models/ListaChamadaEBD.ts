import { ebdCurso } from "./trilha";

export type ListaChamadaEBD = {
  id: number;
  data: Date;
  chamadaMembro: ChamadaMembro;
  ebdCurso: ebdCurso;
  membro: Membro;
};
export type Membro = {
  id: number;
  nome: string;
};
export enum ChamadaMembro {
  PRESENTE = "PRESENTE",
  AUSENTE = "AUSENTE",
  JUSTIFICADO = "JUSTIFICADO",
}
