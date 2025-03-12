export type contaPagar = {
  id: number;
  valor: number;
  dataVencimento: Date;
  status:StatusPagamento;
  dataCriacao: Date;
  descricao:string;
  createdBy: string;
  createdByConta:string;
  dataPagamento:Date;
  tipoDespesa:TipoDespesa;
 
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
  
  
