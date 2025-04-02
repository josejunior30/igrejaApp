package com.esibape.entities;


public enum DescricaoPadrao {
    LUZ("luz"),
    AGUA("agua"),
    CAFE_COMUNHAO("cafe comunhao"),
    DESCARTAVEL("descartavel"),
    MATERIAL_LIMPEZA("material limpeza"),
    SALARIO_PASTORAL("salario"),
    SALARIO_MINISTRO_MUSICA("salario"),
    EVENTO("evento"),
    PRESENTE("presente"),
    OUTRO("outro"),
    INTERNET("internet");

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
