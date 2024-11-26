import { MembroDTO } from "./membro";
import { visitante } from "./visitante";

export type curso = {
  id: number;
  nome: string;
  membro: MembroDTO[];
  visitante: visitante[];
};
