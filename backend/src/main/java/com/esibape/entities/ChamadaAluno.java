package com.esibape.entities;
public enum ChamadaAluno {
    PRESENTE("presente"),
    AUSENTE("ausente"),
    LICENÇA("licença");

    private final String chamadaAluno;

    ChamadaAluno(String chamadaAluno) {
        this.chamadaAluno = chamadaAluno;
    }

    public String getChamadaAluno() {
        return chamadaAluno;
    }

    @Override
    public String toString() {
        return chamadaAluno;
    }
}
