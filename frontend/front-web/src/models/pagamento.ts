

export type Pagamento= {
    [x: string]: any;
    pagamento: any;
    id: number;
    valor: number;
    dataPagamento: Date;
    totalMensalidade: number;
    totalPix: number;
    totalDinheiro:number;
    total: number;	
    formaPagamento:FormaPagamento;
 mesReferencia: MesReferencia;
 alunosPG: AlunoPG;


}


export type AlunoPG={
    id:number;
    nome:string;
    ativo: boolean;
    projetos: projetos;
  
}

export type projetos={
    id: number;
    nome: string;
}

export type EntradaPG={
    id:number;
    valor: number;
    entrada: string;
    formaPagamento:FormaPagamento;
    mesReferencia: MesReferencia;
    
} 
export enum FormaPagamento {
    PIX = 'PIX',
    DINHEIRO = 'DINHEIRO',
    GRATIS = 'GRATIS'
}
export enum MesReferencia {
    JANEIRO = 'JANEIRO',
    FEVEREIRO = 'FEVEREIRO',
    MARCO = 'MARÇO',
    ABRIL = 'ABRIL',
    MAIO = 'MAIO',
    JUNHO = 'JUNHO',
    JULHO = 'JULHO',
    AGOSTO = 'AGOSTO',
    SETEMBRO = 'SETEMBRO',
    OUTUBRO = 'OUTUBRO',
    NOVEMBRO = 'NOVEMBRO',
    DEZEMBRO = 'DEZEMBRO'
}
