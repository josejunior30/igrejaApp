package com.esibape.entities;

public enum AlunoDoenca {
	NAO("não"),
	SIM("sim");
	
	private String AlunoDoenca;

	
	

	private AlunoDoenca(String alunoDoenca) {
		AlunoDoenca = alunoDoenca;
	}




	public String getAlunoDoenca() {
		return AlunoDoenca;
	}




	public void setAlunoDoenca(String alunoDoenca) {
		AlunoDoenca = alunoDoenca;
	}



	
}
