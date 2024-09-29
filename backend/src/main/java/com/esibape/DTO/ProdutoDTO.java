package com.esibape.DTO;

import java.io.Serializable;
import java.util.Objects;

import com.esibape.entities.Produto;
import com.esibape.entities.RequerimentoOrçamento;

public class ProdutoDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id; 
	private String nome;
	private Double preço;

	private RequerimentoOrçamentoDTO requerimento;
	
	public ProdutoDTO() {
		
	}
	

	public ProdutoDTO(Produto entity) {
		
		id = entity.getId();
		this.nome = entity.getNome();
		this.preço = entity.getPreço();

	}

	public ProdutoDTO(Produto entity ,RequerimentoOrçamento requerimentoOrçamento) {
		this(entity);
		this.requerimento= new RequerimentoOrçamentoDTO(entity.getRequerimento());

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


	public RequerimentoOrçamentoDTO getRequerimento() {
		return requerimento;
	}


	public void setRequerimento(RequerimentoOrçamentoDTO requerimento) {
		this.requerimento = requerimento;
	}


	public Double getPreço() {
		return preço;
	}

	public void setPreço(Double preço) {
		this.preço = preço;
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
		ProdutoDTO other = (ProdutoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
