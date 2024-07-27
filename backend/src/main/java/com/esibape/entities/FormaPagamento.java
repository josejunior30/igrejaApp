package com.esibape.entities;

public enum FormaPagamento {
    PIX(1, "pix"),
    DINHEIRO(2, "dinheiro"),
    PENDENTE(3, "pendente"),
    GRATIS(4, "gratis");

    private int codigo;
    private String descricao;

    FormaPagamento(int codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public int getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }
}

