package com.esibape.entities;


public enum TipoAtendimento {
    FAMILIAR("pago"),
    PASTORAL("atrasado"),
    LIDERES("atrasado"),
    PREPARACAO_CASAMENTO("atrasado"),
    PSICOSOCIAL("atrasado"),
    
    NOVOS_CONVERTIDOS("pendente");

    private final String tipoAtendimento ;

    TipoAtendimento(String tipoAtendimento ) {
        this.tipoAtendimento   = tipoAtendimento  ;
    }

    public String geTipoAtendimento  () {
        return tipoAtendimento  ;
    }
    
    // Convert from String to Enum
    public static TipoAtendimento fromValor(String tipoAtendimento ) {
        for (TipoAtendimento chamada : values()) {
            if (chamada.geTipoAtendimento().equalsIgnoreCase(tipoAtendimento )) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + tipoAtendimento );
    }

    @Override
    public String toString() {
        return tipoAtendimento  ;
    }
}
