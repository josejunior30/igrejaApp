export type contaPagar = {
  id: number;
  valor: number;
  dataVencimento: Date;
  status:StatusPagamento;
  dataCriacao: Date;
  descricao:string;
  descricaoConta:DescricaoConta;
  createdBy: string;
  createdByConta:string;
  dataPagamento:Date;
  tipoDespesa:TipoDespesa;
 
}
export type DescricaoConta={
  descricao:string;
}
export enum StatusPagamento {
	PAGO="PAGO",
	ATRASADO="ATRASADO",
	PENDENTE="PENDENTE"
  }
  export enum TipoDespesa {
    FIXO = "FIXO",
    VARIAVEL = "VARIAVEL"
  }
  
  
