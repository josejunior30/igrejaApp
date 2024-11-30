package com.esibape.entities;

public enum ChamadaVisitante {
    PRESENTE("presente"),
    AUSENTE("ausente"),
    LICENÇA("licença");

    private final String chamadaVisitante;

    ChamadaVisitante(String chamadaVisitante) {
        this.chamadaVisitante = chamadaVisitante;
    }

    public String getChamadaVisitante() {
        return chamadaVisitante;
    }

    @Override
    public String toString() {
        return chamadaVisitante;
    }
}
