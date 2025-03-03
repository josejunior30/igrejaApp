export type contaPagar = {
  id: number;
  valor: number;
  dataVencimento: Date;
  status:StatusPagamento;
  dataCriacao: Date;
  descricao:string;
  createdBy: number;
 
}

export enum StatusPagamento {
	PAGO="PAGO",
	ATRASADO="ATRASADO",
	PENDENTE="PENDENTE"
  }
