package com.esibape.entities;


public enum StatusRequerimento {
    APROVADO("aprovado"),
    RECUSADO("recusado"),
    PENDENTE("PENDENTE");

    private final String statusRequerimento ;

    StatusRequerimento(String statusRequerimento ) {
        this.statusRequerimento  = statusRequerimento ;
    }

    public String getStatusRequerimento () {
        return statusRequerimento ;
    }

    @Override
    public String toString() {
        return statusRequerimento ;
    }
}
