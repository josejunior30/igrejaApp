
package com.esibape.entities;

public enum Genero  {
    HOMEM("homem"),
    MULHER("mulher");
   

    private final String descricao;

    // Construtor do enum
    Genero(String descricao) {
        this.descricao = descricao;
    }

    // Método getter para acessar a descrição
    public String getDescricao() {
        return descricao;
    }
}
