
package com.esibape.entities;

public enum TipoCulto  {
    CULTO_DA_MANHA("culto de manhã"),
    CULTO_DA_NOITE("culto de noite"),
    BATISMO("batismo"),
    ANIVERSARIO("aniversário"),
    ORDENACAO("ordenação");
	

    private final String descricao;

    // Construtor do enum
    TipoCulto(String descricao) {
        this.descricao = descricao;
    }

    // Método getter para acessar a descrição
    public String getDescricao() {
        return descricao;
    }



// Convert from String to Enum
public static TipoCulto fromDescricao(String descricao) {
    for (TipoCulto tipoCulto : values()) {
        if (tipoCulto.getDescricao().equalsIgnoreCase(descricao)) {
            return tipoCulto;
        }
    }
    throw new IllegalArgumentException("Valor inválido para ChamadaMembro: " + descricao);
}
}

