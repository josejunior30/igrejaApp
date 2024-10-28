package com.esibape.DTO;

import java.io.Serializable;

import com.esibape.entities.Curso;
import com.esibape.entities.Estudos;

public class EstudosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String caminhoArquivo;
	private Curso curso;
	
	public EstudosDTO() {
		
	}
	
	
	
	public EstudosDTO(Long id, String nome, String caminhoArquivo, Curso curso) {
		super();
		this.id = id;
		this.nome = nome;
		this.caminhoArquivo = caminhoArquivo;
		this.curso = curso;
	}



	public EstudosDTO(Estudos entity ) {
		this.id= entity.getId();
		this.nome = entity.getNome();
		this.caminhoArquivo= entity.getCaminhoArquivo();
		this.curso = entity.getCurso();
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
	public String getCaminhoArquivo() {
		return caminhoArquivo;
	}
	public void setCaminhoArquivo(String caminhoArquivo) {
		this.caminhoArquivo = caminhoArquivo;
	}
	public Curso getCurso() {
		return curso;
	}
	public void setCurso(Curso curso) {
		this.curso = curso;
	}
	
	
	
}
