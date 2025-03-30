export type Atendimento = {
    id: number;
    data:Date;
    horario:string;
   tipoAtendimento: TipoAtendimento;
   membroIds:number[];
   visitanteIds:number[];
  membroNomes: string[];
  visitanteNomes: string[];
  };

  export enum TipoAtendimento {
    FAMILIAR ="FAMILIAR",
    PASTORAL ="PASTORAL",
    LIDERES = "LIDERES",
    PREPARACAO_CASAMENTO ="PREPARACAO_CASAMENTO",
    PSICOSOCIAL ="PSICOSOCIAL",
    NOVOS_CONVERTIDOS= "NOVOS_CONVERTIDOS"

  }
  