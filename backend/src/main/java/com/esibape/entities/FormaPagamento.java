package com.esibape.entities;

public enum FormaPagamento {
    PIX(1, "pix"),
    DINHEIRO(2, "dinheiro"),
	 GRATIS(3, "Gratis");
  

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

