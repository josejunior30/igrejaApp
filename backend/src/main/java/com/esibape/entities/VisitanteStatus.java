
package com.esibape.entities;


public enum VisitanteStatus {
   NIVEL_1("nivel 1"),
   NIVEL_2("nivel 2"),
    NIVEL_3("nivel 3");

    private final String status;

    VisitanteStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // Convert from String to Enum
    public static VisitanteStatus fromValor(String status) {
        for (VisitanteStatus visitanteStatus : values()) {
            if (visitanteStatus.getStatus().equalsIgnoreCase(status)) {
                return visitanteStatus;
            }
        }
        throw new IllegalArgumentException("Valor inválido para vistante: " + status);
    }
}