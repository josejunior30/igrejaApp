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

    @Override
    public String toString() {
        return statusPagamento ;
    }
}
