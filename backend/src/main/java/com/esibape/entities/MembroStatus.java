
package com.esibape.entities;


public enum MembroStatus {
    AFASTADO("Afastado"),
    ATIVO("Ativo"),
    DESLIGADO("Desligado");

    private final String status;

    MembroStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    // Convert from String to Enum
    public static MembroStatus fromValor(String status) {
        for (MembroStatus chamada : values()) {
            if (chamada.getStatus().equalsIgnoreCase(status)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + status);
    }
}