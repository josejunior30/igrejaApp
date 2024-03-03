export type projetosDTO={
    id:number;
    nome:string;
    lider: string;
    coordenador: string;
    foto_coordenador: string;
    foto_lider: string;
    alunos: alunos;
}
export type alunos={
  map(arg0: (aluno: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id:number;
    nome: string;
    dataNascimento:Date;
     idade:string;
	 rg: string;
    responsavel: string;
	 cpfResponsavel: string;
	
}