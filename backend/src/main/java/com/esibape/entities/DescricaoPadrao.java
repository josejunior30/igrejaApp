package com.esibape.entities;


public enum DescricaoPadrao {
    LUZ("pago"),
    AGUA("atrasado"),
    CAFE_COMUNHAO("atrasado"),
    DESCARTAVEL("atrasado"),
    MATERIAL_LIMPEZA("atrasado"),
    SALARIO_PASTORAL("atrasado"),
    SALARIO_MINISTRO_MUSICA("atrasado"),
    EVENTO("atrasado"),
    PRESENTE("atrasado"),
    OUTRO("outro"),
    INTERNET("pendente");

    private final String descricaoPadrao ;

    DescricaoPadrao(String descricaoPadrao ) {
        this.descricaoPadrao  = descricaoPadrao ;
    }

    public String getDescricaoPadrao () {
        return descricaoPadrao;
    }
    
    // Convert from String to Enum
    public static DescricaoPadrao fromValor(String descricaoPadrao) {
        for (DescricaoPadrao chamada : values()) {
            if (chamada.getDescricaoPadrao().equalsIgnoreCase(descricaoPadrao)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + descricaoPadrao);
    }

    @Override
    public String toString() {
        return descricaoPadrao ;
    }
}
