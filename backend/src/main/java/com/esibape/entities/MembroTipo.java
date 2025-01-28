
package com.esibape.entities;


public enum MembroTipo {
    BATISMO("Batismo"),
    TRANSFERENCIA("Transferencia"),
    ACLAMACAO("Aclamação");

    private final String tipo;

    MembroTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }

    // Convert from String to Enum
    public static MembroTipo fromValor(String tipo) {
        for (MembroTipo membroTipo : values()) {
            if (membroTipo.getTipo().equalsIgnoreCase(tipo)) {
                return membroTipo;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + tipo);
    }
}