
package com.esibape.entities;


public enum VisitanteStatus {
    AFASTADO("Afastado"),
    ATIVO("Ativo"),
    DESLIGADO("Desligado");

    private final String status;

    VisitanteStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // Convert from String to Enum
    public static VisitanteStatus fromValor(String status) {
        for (VisitanteStatus chamada : values()) {
            if (chamada.getStatus().equalsIgnoreCase(status)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + status);
    }
}