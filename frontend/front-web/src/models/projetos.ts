export type projetosDTO={
    id:number;
    nome:string;
    lider: string;
    coordenador: string;
    foto_coordenador: string;
    foto_lider: string;
    alunos: alunos[];

}
export type alunos={
  
    id:number;
    nome: string;
    dataNascimento:Date;
     idade:string;
	 rg: string;
    responsavel: string;
	 cpfResponsavel: string;
     telefone: string;
     horario:string ;
     chamada: chamada[];

}
export type chamada = {
    id: number,
    data: Date;
    chamadaAluno: number;
}
