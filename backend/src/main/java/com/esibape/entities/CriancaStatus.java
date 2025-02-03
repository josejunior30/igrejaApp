
package com.esibape.entities;


public enum CriancaStatus {
   VISITANTE("visitante"),
    MEMBRO("Membro");
  

    private final String status;

    CriancaStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // Convert from String to Enum
    public static CriancaStatus fromValor(String status) {
        for (CriancaStatus chamada : values()) {
            if (chamada.getStatus().equalsIgnoreCase(status)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + status);
    }
}