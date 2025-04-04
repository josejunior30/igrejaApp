export type OrdemServico = {
  id?: number;
  descricao: string;
  servicos: Servico[];
  statusOrdem: StatusOrdemDeServico;
};

export enum StatusOrdemDeServico {
  PAGO = "PAGO",
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export type Servico = {
  id?: number;
  descricao: string;
  ordem_servico_id?: number;
  statusServico: StatusServico;
  materialObra: MaterialObra[];
};

export enum StatusServico {
  PAGO = "PAGO",
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export type MaterialObra = {
  id?: number;
  nome: string;
  checkInConfirmado: boolean;
  servico_id?: number;
};
