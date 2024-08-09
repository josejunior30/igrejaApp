package com.esibape.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Table(name = "tb_entrada")
@Entity
public class OutrosPG implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String entrada;
	private Integer valor;
	@Enumerated(EnumType.STRING)
	private FormaPagamento formaPagamento;
	@Enumerated(EnumType.STRING)
	private MesReferencia mesReferencia;
	
	public OutrosPG() {
		
	}
	
	
	public OutrosPG(Long id, String entrada, Integer valor, FormaPagamento formaPagamento, MesReferencia mesReferencia) {
		super();
		this.id = id;
		this.entrada = entrada;
		this.valor = valor;
		this.formaPagamento = formaPagamento;
		this.mesReferencia = mesReferencia;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEntrada() {
		return entrada;
	}

	public void setEntrada(String entrada) {
		this.entrada = entrada;
	}

	public Integer getValor() {
		return valor;
	}

	public void setValor(Integer valor) {
		this.valor = valor;
	}

	public FormaPagamento getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(FormaPagamento formaPagamento) {
		this.formaPagamento = formaPagamento;
	}
	

	

	public MesReferencia getMesReferencia() {
		return mesReferencia;
	}


	public void setMesReferencia(MesReferencia mesReferencia) {
		this.mesReferencia = mesReferencia;
	}


	@Override
	public int hashCode() {
		return Objects.hash(entrada, formaPagamento, id, valor);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OutrosPG other = (OutrosPG) obj;
		return Objects.equals(entrada, other.entrada) && formaPagamento == other.formaPagamento
				&& Objects.equals(id, other.id) && Objects.equals(valor, other.valor);
	}
	
	
}
