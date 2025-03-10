export type TransacaoDTO = {
  id: number;
  valor: number;
  data: Date;
  descricao: string;
  isReceita: boolean;
  tipoDespesa: TipoDespesa;
};
export enum TipoDespesa {
  FIXO,
  VARIAVEL,
}
