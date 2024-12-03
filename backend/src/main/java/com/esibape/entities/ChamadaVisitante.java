package com.esibape.entities;
public enum ChamadaVisitante {
    PRESENTE("Presente"),
    AUSENTE("Ausente"),
    JUSTIFICADO("Justificado");

    private final String valor;

    ChamadaVisitante(String valor) {
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }

    // Convert from String to Enum
    public static ChamadaVisitante fromValor(String valor) {
        for (ChamadaVisitante chamada : values()) {
            if (chamada.getValor().equalsIgnoreCase(valor)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para ChamadaVisitante: " + valor);
    }
}