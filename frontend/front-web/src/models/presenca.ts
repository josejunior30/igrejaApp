

export type PresencaDTO ={

    id: number;
    data: Date;
    chamadaAluno: number;
    alunos: alunos;
    projetos: projeto;

}

export type alunos ={
    id: number;
    nome: string;
   
}
export type projeto = {
    id: number;
    nome: string;

}