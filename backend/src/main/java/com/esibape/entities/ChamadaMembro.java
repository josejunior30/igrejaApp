package com.esibape.entities;

public enum ChamadaMembro {
	  PRESENTE("Presente"),
	    AUSENTE("Ausente"),
	    JUSTIFICADO("Justificado");

	    private final String valor;

	    ChamadaMembro(String valor) {
	        this.valor = valor;
	    }

	    public String getValor() {
	        return valor;
	    }

	    // Convert from String to Enum
	    public static ChamadaMembro fromValor(String valor) {
	        for (ChamadaMembro chamada : values()) {
	            if (chamada.getValor().equalsIgnoreCase(valor)) {
	                return chamada;
	            }
	        }
	        throw new IllegalArgumentException("Valor inválido para ChamadaMembro: " + valor);
	    }
	}

