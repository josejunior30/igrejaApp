
package com.esibape.entities;

public enum MembroEstado {
		
	SOLTEIRO("solteiro"),
	CASADO("casado"),
	DIVORCIADO("divorciado"),
	VIUVO("viuva(a)");
	
	private String estadoCivil;

	MembroEstado(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}


	
}
