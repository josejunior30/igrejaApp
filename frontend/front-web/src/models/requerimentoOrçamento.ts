
export type requerimentoOrçamento={
 
    id:number;
	dataRequerimento: Date;
	dataEvento:Date;
	dataAprovacao:Date;
	statusRequerimento:number;
	dataPagamento:Date;
	"O que vai ser feito ?": string;
	"Qual o motivo de ser feito ?": string;
	responsavel: string;
	local: string;
	Total: number;
    produto: Produto[];

}
export type Produto={
    id:number; 
	nome: string;
	preço: number;
	quantidade: number; 
}
export enum Status {
	PENDENTE = 2,
	RECUSADO = 1,
	APROVADO = 0,
  }