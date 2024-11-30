package com.esibape.entities;
public enum ChamadaMembro {
    PRESENTE("presente"),
    AUSENTE("ausente"),
    LICENÇA("licença");

    private final String chamadaMembro;

    ChamadaMembro(String chamadaMembro) {
        this.chamadaMembro = chamadaMembro;
    }

    public String getChamadaMembro() {
        return chamadaMembro;
    }

    @Override
    public String toString() {
        return chamadaMembro;
    }
}
