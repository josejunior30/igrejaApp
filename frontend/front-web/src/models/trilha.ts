import { EBDCurso } from "./EbdEstudo";
import { MembroDTO } from "./membro";
import { visitante } from "./visitante";

export type curso = {
  id: number;
  nome: string;
  membro: MembroDTO[];
  visitante: visitante[];
  EBDCurso: EBDCurso[];
};
export type cursoDTO = {
  id: number;
  nome: string;
  resumo: string;
  membro: MembroDTO[];
  visitante: visitante[];
  ebdCurso: ebdCurso[];
};

export type ebdCurso = {
  id: number;
  nome: string;
  resumo: string;
  visitante: visitante[];
  membro: MembroDTO[];
};
