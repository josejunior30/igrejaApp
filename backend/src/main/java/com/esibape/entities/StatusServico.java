package com.esibape.entities;


public enum StatusServico {
	 PENDENTE("pendente"),
	 EM_ANDAMENTO("em andamento"),
	 CONCLUIDA("concluida");

    private final String statusOrdem ;

    StatusServico(String statusOrdem ) {
        this.statusOrdem  = statusOrdem ;
    }

    public String getStatusOrdem () {
        return statusOrdem ;
    }
    
    // Convert from String to Enum
    public static StatusServico fromValor(String statusOrdem) {
        for (StatusServico chamada : values()) {
            if (chamada.getStatusOrdem().equalsIgnoreCase(statusOrdem)) {
                return chamada;
            }
        }
        throw new IllegalArgumentException("Valor inválido para membro: " + statusOrdem);
    }

    @Override
    public String toString() {
        return statusOrdem ;
    }
}
