package com.esibape.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.esibape.entities.Alunos;
import com.esibape.entities.Projetos;

public class AlunosDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private LocalDate dataNascimento;
	private String idade;
	private String rg;
	private String responsavel;
	private String cpfResponsavel;
	
	private ProjetosDTO projetos;
	
	public AlunosDTO() {
		
		
	}

	public AlunosDTO(Alunos entity) {
		
		this.id = entity.getId();
		this.nome = entity.getNome();
		this.dataNascimento = entity.getDataNascimento();
		this.idade = entity.getIdade();
		this.rg = entity.getRg();
		this.responsavel = entity.getResponsavel();
		this.cpfResponsavel = entity.getCpfResponsavel();
	}
public AlunosDTO(Alunos entity, Projetos projetos) {
		
		this(entity);
		this.projetos = new ProjetosDTO (projetos);
		
		
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

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getIdade() {
		return idade;
	}

	public void setIdade(String idade) {
		this.idade = idade;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public String getCpfResponsavel() {
		return cpfResponsavel;
	}

	public void setCpfResponsavel(String cpfResponsavel) {
		this.cpfResponsavel = cpfResponsavel;
	}
	


	public ProjetosDTO getProjetos() {
		return projetos;
	}

	public void setProjetos(ProjetosDTO projetos) {
		this.projetos = projetos;
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
		AlunosDTO other = (AlunosDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
