package com.esibape.entities;

public enum ChamadaAluno {
		PRESENTE("presente"),
	AUSENTE("ausente"),
	LICENÇA("licença");
	
	private String chamadaAluno;

	
	 
	 private ChamadaAluno(String chamadaAluno) {
		this.chamadaAluno = chamadaAluno;
	}



	public String getChamadaAluno() {
		return chamadaAluno;
	}



	public void setChamadaAluno(String chamadaAluno) {
		this.chamadaAluno = chamadaAluno;
	}



	
}
