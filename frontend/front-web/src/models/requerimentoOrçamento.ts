
export type requerimentoOrçamento={
 
    id:number;
	dataRequerimento: Date;
	dataEvento:Date;
	dataAprovacao:Date;

	statusRequerimento:StatusRequerimento;
	dataPagamento:Date;
	"O que vai ser feito ?": string;
	"Qual o motivo de ser feito ?": string;
	responsavel: string;
	local: string;
	Total: number;
	emailResponsavel:string;
    produto: Produto[];

}

  export enum StatusRequerimento {
	APROVADO,
	RECUSADO,
	PENDENTE
	
	
  }

  export type Produto={
    id:number; 
	nome: string;
	preço: number;
	quantidade: number; 
}