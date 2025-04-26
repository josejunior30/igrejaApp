
export type Atendimento = {
  id: number;
  data: Date;
  horario: string;
  tipoAtendimento: TipoAtendimento;
  opcaoAtendimento:OpcaoAtendimento
  outro: string[];
  membroIds: number[];
  visitanteIds: number[];
  membroNomes: string[];
  visitanteNomes: string[];
};
export type OpcaoAtendimento={
  id:number;
  descricao:string;
}
export enum TipoAtendimento {
  FAMILIAR = "FAMILIAR",
  PASTORAL = "PASTORAL",
  LIDERES = "LIDERES",
  PREPARACAO_CASAMENTO = "PREPARACAO_CASAMENTO",
  PSICOSOCIAL = "PSICOSOCIAL",
  NOVOS_CONVERTIDOS = "NOVOS_CONVERTIDOS",
}