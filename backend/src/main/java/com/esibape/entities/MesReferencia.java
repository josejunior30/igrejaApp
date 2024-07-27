package com.esibape.entities;

public enum MesReferencia {
    JANEIRO(1, "janeiro"),
    FEVEREIRO(2, "fevereiro"),
    MARCO(3, "março"),
    ABRIL(4, "abril"),
    MAIO(5, "maio"),
    JUNHO(6, "junho"),
    JULHO(7, "julho"),
    AGOSTO(8, "agosto"),
    SETEMBRO(9, "setembro"),
    OUTUBRO(10, "outubro"),
    NOVEMBRO(11, "novembro"),
    DEZEMBRO(12, "dezembro");

    private final int numero;
    private final String nome;

    MesReferencia(int numero, String nome) {
        this.numero = numero;
        this.nome = nome;
    }

    public int getNumero() {
        return numero;
    }

    public String getNome() {
        return nome;
    }
}
