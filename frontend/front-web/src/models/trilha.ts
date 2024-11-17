import { MembroDTO } from "./membro";

export type curso = {
  id: number;
  nome: string;
  membro: MembroDTO[];
};
