

export type pagamento= {
    id: number;
    valor: number;
    dataPagamento: Date;
    totalMes: number;
    total: number;	
    formaPagamento:number;
 mesReferencia: MesReferencia;
 alunosPG: AlunoPG;

}
export type AlunoPG={
    id:number;
    nome:string;
}
export enum FormaPagamento {
    PIX = 'pix',
    DINHEIRO = 'dinheiro',
    PENDENTE = 'pendente',
    GRATIS = 'gratis'
}
export enum MesReferencia {
    JANEIRO = 'janeiro',
    FEVEREIRO = 'fevereiro',
    MARCO = 'março',
    ABRIL = 'abril',
    MAIO = 'maio',
    JUNHO = 'junho',
    JULHO = 'julho',
    AGOSTO = 'agosto',
    SETEMBRO = 'setembro',
    OUTUBRO = 'outubro',
    NOVEMBRO = 'novembro',
    DEZEMBRO = 'dezembro'
}