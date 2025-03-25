export type TransacaoDTO = {
  id: number;
  valor: number;
  data: Date;
  descricao: string;
  descricaoReceita:DescricaoReceita;
  isReceita: boolean;
  tipoDespesa: TipoDespesa;
  conta_pagar_id:number;
};
export type DescricaoReceita={
  descricao:string;
}
export enum TipoDespesa {
  FIXO,
  VARIAVEL,
}
