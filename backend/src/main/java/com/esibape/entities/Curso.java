package com.esibape.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tb_curso")
public class Curso implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	@OneToMany(mappedBy = "curso")
	private List<Estudos> estudos = new ArrayList<>();
	
	@OneToMany(mappedBy = "curso")
    private List<Inscricao> inscricoes = new ArrayList<>();
	
	public Curso() {
		
		
	}

	public Curso(Long id, String nome, List<Estudos> estudos, List<Inscricao> inscricoes) {
		super();
		this.id = id;
		this.nome = nome;
		this.estudos = estudos;
		this.inscricoes = inscricoes;
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
		Curso other = (Curso) obj;
		return Objects.equals(id, other.id);
	} 
	
	
}
