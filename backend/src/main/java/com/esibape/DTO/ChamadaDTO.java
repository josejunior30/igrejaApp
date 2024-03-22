package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


import com.esibape.entities.Alunos;
import com.esibape.entities.Chamada;
import com.esibape.entities.ChamadaAluno;
import com.esibape.entities.Projetos;

public class ChamadaDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate data; 
	private ChamadaAluno chamadaAluno;
	
	private AlunosDTO alunos;
	private ProjetosDTO projetosChamada;
	
	
	
	public ChamadaDTO() {
		
		
	}


	public ChamadaDTO(Chamada entity) {
		this.id = entity.getId();
		this.data = entity.getData();
		this.chamadaAluno = entity.getChamadaAluno();
	}
	public ChamadaDTO(Chamada entity,Alunos alunos, Projetos projetosChamada) {
		this(entity);
		this.alunos= new AlunosDTO(alunos);
		this.projetosChamada= new ProjetosDTO(projetosChamada);
		
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public ChamadaAluno getChamadaAluno() {
		return chamadaAluno;
	}

	public void setChamadaAluno(ChamadaAluno chamadaAluno) {
		this.chamadaAluno = chamadaAluno;
	}
	

	public AlunosDTO getAlunos() {
		return alunos;
	}


	public void setAlunos(AlunosDTO alunos) {
		this.alunos = alunos;
	}
	

	

	public ProjetosDTO getProjetosChamada() {
		return projetosChamada;
	}


	public void setProjetosChamada(ProjetosDTO projetosChamada) {
		this.projetosChamada = projetosChamada;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChamadaDTO other = (ChamadaDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
