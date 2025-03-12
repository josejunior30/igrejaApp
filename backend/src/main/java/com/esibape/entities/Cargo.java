
package com.esibape.entities;


public enum Cargo {
    JUVENTUDE("juventude"),
    ADOLESCENTES("adolescentes"),
    ADORAÇAO("adoraçao"),
    SERVIÇO("serviço"),
    MULHERES("mulheres"),
    MISSAO("missao"),
    ENSINO("ensino"),	
    FINANÇAS("finanças");
    

    private final String cargo;

    Cargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCargo() {
        return cargo;
    }

    // Convert from String to Enum
    public static Cargo fromValor(String cargo) {
        for (Cargo chamada : values()) {
            if (chamada.getCargo().equalsIgnoreCase(cargo)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + cargo);
    }
}