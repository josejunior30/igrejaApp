package com.esibape.entities;


public enum StatusOrdemDeServico {
	 PENDENTE("pendente"),
	 EM_ANDAMENTO("em andamento"),
	 CONCLUIDA("concluida");

    private final String statusOrdem ;

    StatusOrdemDeServico(String statusOrdem ) {
        this.statusOrdem  = statusOrdem ;
    }

    public String getStatusOrdem () {
        return statusOrdem ;
    }
    
    // Convert from String to Enum
    public static StatusOrdemDeServico fromValor(String statusOrdem) {
        for (StatusOrdemDeServico chamada : values()) {
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
