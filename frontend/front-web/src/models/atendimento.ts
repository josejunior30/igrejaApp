export type Atendimento = {
    id: number;
    data:Date;
    horario:string;
   tipoAtendimento: TipoAtendimento;
  };

  export enum TipoAtendimento {
    FAMILIAR ="FAMILIAR",
    PASTORAL ="PASTORAL",
    lIDERES = "LIDERES",
    PREPARACAO_CASAMENTO ="PREPARAÇÃO CASAMENTO",
    PSICOSOCIAL ="PSICOSOCIAL",
    NOVOS_CONVERTIDOS= "NOVOS CONVERTIDOS"

  }