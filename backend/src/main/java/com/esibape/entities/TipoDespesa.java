
package com.esibape.entities;


public enum TipoDespesa {
    FIXO("Fixo"),
    VARIAVEL("Variavel");
    

    private final String status;

    TipoDespesa(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // Convert from String to Enum
    public static TipoDespesa fromValor(String status) {
        for (TipoDespesa chamada : values()) {
            if (chamada.getStatus().equalsIgnoreCase(status)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + status);
    }
}