package com.esibape.DTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.esibape.entities.Alunos;
import com.esibape.entities.Projetos;

public class ProjetosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String lider;
	
	private List<AlunosDTO>alunos = new ArrayList<>();

	public ProjetosDTO() {
		
	}

	public ProjetosDTO(Long id, String nome, String lider, List<AlunosDTO> alunos) {
		super();
		this.id = id;
		this.nome = nome;
		this.lider = lider;
		this.alunos = alunos;
	}
	
	public ProjetosDTO(Projetos entity) {
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.lider = entity.getLider();
	
		
	}
	

	public ProjetosDTO(Projetos entity, List<Alunos>alunos) {
		this(entity);
		alunos.forEach(x-> this.alunos.add(new AlunosDTO(x)));
		
		
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

	public String getLider() {
		return lider;
	}

	public void setLider(String lider) {
		this.lider = lider;
	}
	

	public List<AlunosDTO> getAlunos() {
		return alunos;
	}

	public void setAlunos(List<AlunosDTO> alunos) {
		this.alunos = alunos;
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
		ProjetosDTO other = (ProjetosDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
