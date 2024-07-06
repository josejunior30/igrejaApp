package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.esibape.entities.AlunoStatus;
import com.esibape.entities.Alunos;

public class AlunoStatusDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String pendencia;
	
	private List<AlunosDTO>alunos = new ArrayList<>();
	
	public AlunoStatusDTO() {
		
	}

	public AlunoStatusDTO(Long id, String pendencia, List<AlunosDTO> alunos) {
		super();
		this.id = id;
		this.pendencia = pendencia;
		this.alunos = alunos;
	}
	  public AlunoStatusDTO(AlunoStatus entity) {
	        if (entity != null) {
	            this.id = entity.getId();
	            this.pendencia = entity.getPendencia();
	        }
	    }
	    public AlunoStatusDTO(AlunoStatus entity, List<Alunos> alunos) {
	        if (entity != null) {
	            this.id = entity.getId();
	            this.pendencia = entity.getPendencia();
	        }
	        if (alunos != null) {
	            alunos.forEach(aluno -> this.alunos.add(new AlunosDTO(aluno)));
	        }
	    }
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPendencia() {
		return pendencia;
	}

	public void setPendencia(String pendencia) {
		this.pendencia = pendencia;
	}

	public List<AlunosDTO> getAlunos() {
		return alunos;
	}

	public void setAlunos(List<AlunosDTO> alunos) {
		this.alunos = alunos;
	}

}