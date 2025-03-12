package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tb_produto")
public class Produto implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id; 
	private String nome;
	@Column(name="preco")
	private BigDecimal preço;
	private Integer quantidade;
	@ManyToOne
	@JoinColumn(name = "requerimento_id")
	private RequerimentoOrçamento requerimento;

	public Produto() {
		
	}



	public Produto(Long id, String nome, BigDecimal preço, Integer quantidade, RequerimentoOrçamento requerimento) {
		super();
		this.id = id;
		this.nome = nome;
		this.preço = preço;
		this.quantidade = quantidade;
		this.requerimento = requerimento;
	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getPreço() {
		return preço;
	}

	public void setPreço(BigDecimal preço) {
		this.preço = preço;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}



	public RequerimentoOrçamento getRequerimento() {
		return requerimento;
	}


	public void setRequerimento(RequerimentoOrçamento requerimento) {
		this.requerimento = requerimento;
	}


	public Integer getQuantidade() {
		return quantidade;
	}



	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
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
		Produto other = (Produto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
