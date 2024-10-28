package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.entities.Curso;
import com.esibape.entities.Estudos;
import com.esibape.entities.Inscricao;

public class CursoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nome;
	private List<EstudosDTO> estudos  = new ArrayList<>();
	private List<InscricaoDTO> inscricoes = new ArrayList<>();
	  
	public CursoDTO() {
			
			
	}
	
	
	public CursoDTO(Long id, String nome, List<EstudosDTO> estudos, List<InscricaoDTO> inscricoes) {
		super();
		this.id = id;
		this.nome = nome;
		this.estudos = estudos;
		this.inscricoes = inscricoes;
	}


	public CursoDTO(Curso entity) {
		this.id= entity.getId();
		this.nome=entity.getNome();
		
	}
	
	public CursoDTO(Curso entity, List<Estudos> estudos, List<Inscricao>inscricoes ) {
		this(entity);
		estudos.forEach(x-> this.estudos.add(new EstudosDTO(x)));
		inscricoes.forEach(x-> this.inscricoes.add(new InscricaoDTO(x)));
		
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public List<Estudos> getEstudos() {
		return estudos;
	}


	public void setEstudos(List<Estudos> estudos) {
		this.estudos = estudos;
	}


	public List<Inscricao> getInscricoes() {
		return inscricoes;
	}


	public void setInscricoes(List<Inscricao> inscricoes) {
		this.inscricoes = inscricoes;
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
		CursoDTO other = (CursoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
	
}
