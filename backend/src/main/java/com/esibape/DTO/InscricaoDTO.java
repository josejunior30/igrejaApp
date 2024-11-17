package com.esibape.DTO;

import java.io.Serializable;


import com.esibape.entities.Curso;
import com.esibape.entities.Inscricao;
import com.esibape.entities.Membro;

public class InscricaoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
    private Long id;
    private CursoDTO curso;
    private MembroDTO membrosEBD;
 public InscricaoDTO () {
    	
    	
    }

public InscricaoDTO(Long id, CursoDTO curso, MembroDTO membrosEBD) {
	super();
	this.id = id;
	this.curso = curso;
	this.membrosEBD = membrosEBD;
}


public InscricaoDTO (Inscricao entity) {
	this.id = entity.getId();
	

}

public InscricaoDTO (Inscricao entity, Curso curso, Membro membrosEBD) {
	this(entity);
	this.curso = new CursoDTO(curso);
	this.membrosEBD = new MembroDTO(membrosEBD);
	
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}



public CursoDTO getCurso() {
	return curso;
}

public void setCurso(CursoDTO curso) {
	this.curso = curso;
}

public MembroDTO getMembrosEBD() {
	return membrosEBD;
}

public void setMembrosEBD(MembroDTO membrosEBD) {
	this.membrosEBD = membrosEBD;
}














    
    
}
