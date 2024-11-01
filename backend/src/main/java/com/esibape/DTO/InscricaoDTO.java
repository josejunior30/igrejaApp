package com.esibape.DTO;

import java.io.Serializable;

import com.esibape.entities.Curso;
import com.esibape.entities.Inscricao;
import com.esibape.entities.Membro;

public class InscricaoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
    private Long id;
    private Curso curso;
    private Membro membroEBD;
    
 public InscricaoDTO () {
    	
    	
    }

public InscricaoDTO(Long id, Curso curso, Membro membroEBD) {
	super();
	this.id = id;
	this.curso = curso;
	this.membroEBD = membroEBD;
}
 
public InscricaoDTO (Inscricao entity) {
	
	this.id = entity.getId();
	this.curso = entity.getCurso();
	this.membroEBD = entity.getMembroEBD();
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public Curso getCurso() {
	return curso;
}

public void setCurso(Curso curso) {
	this.curso = curso;
}

public Membro getMembroEBD() {
	return membroEBD;
}

public void setMembroEBD(Membro membroEBD) {
	this.membroEBD = membroEBD;
}
    
    
}
