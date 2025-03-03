package com.esibape.entities;


public enum StatusPagamento {
    APROVADO("aprovado"),
    RECUSADO("recusado"),
    PENDENTE("PENDENTE");

    private final String statusPagamento ;

    StatusPagamento(String statusPagamento ) {
        this.statusPagamento  = statusPagamento ;
    }

    public String getStatusPagamento () {
        return statusPagamento ;
    }
    
    // Convert from String to Enum
    public static StatusPagamento fromValor(String statusPagamento) {
        for (StatusPagamento chamada : values()) {
            if (chamada.getStatusPagamento().equalsIgnoreCase(statusPagamento)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + statusPagamento);
    }

    @Override
    public String toString() {
        return statusPagamento ;
    }
}
