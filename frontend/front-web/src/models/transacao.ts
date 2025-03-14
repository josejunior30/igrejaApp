export type TransacaoDTO = {
  id: number;
  valor: number;
  data: Date;
  descricao: string;
  isReceita: boolean;
  tipoDespesa: TipoDespesa;
  conta_pagar_id:number;
};
export enum TipoDespesa {
  FIXO,
  VARIAVEL,
}
