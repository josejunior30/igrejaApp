package com.esibape.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="tb_orcamento_mensal")
public class FluxoCaixa implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private BigDecimal receitaTotal;
	private BigDecimal despesaTotal;
	private BigDecimal saldoLiquido;
	private BigDecimal despesaFixa;
	private BigDecimal despesaVariavel;
	private Integer mes;
	private Integer ano;

	public FluxoCaixa() {
		
		
	}

	
	public FluxoCaixa(Long id, BigDecimal receitaTotal, BigDecimal despesaTotal, BigDecimal saldoLiquido,
			BigDecimal despesaFixa, BigDecimal despesaVariavel, Integer mes, Integer ano) {
		super();
		this.id = id;
		this.receitaTotal = receitaTotal;
		this.despesaTotal = despesaTotal;
		this.saldoLiquido = saldoLiquido;
		this.despesaFixa = despesaFixa;
		this.despesaVariavel = despesaVariavel;
		this.mes = mes;
		this.ano = ano;
	}




	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getReceitaTotal() {
		return receitaTotal;
	}

	public void setReceitaTotal(BigDecimal receitaTotal) {
		this.receitaTotal = receitaTotal;
	}

	public BigDecimal getDespesaTotal() {
		return despesaTotal;
	}

	public void setDespesaTotal(BigDecimal despesaTotal) {
		this.despesaTotal = despesaTotal;
	}

	public BigDecimal getSaldoLiquido() {
		return saldoLiquido;
	}

	public void setSaldoLiquido(BigDecimal saldoLiquido) {
		this.saldoLiquido = saldoLiquido;
	}

	public Integer getMes() {
		return mes;
	}


	public void setMes(Integer mes) {
		this.mes = mes;
	}


	public Integer getAno() {
		return ano;
	}


	public void setAno(Integer ano) {
		this.ano = ano;
	}


	public BigDecimal getDespesaFixa() {
		return despesaFixa;
	}


	public void setDespesaFixa(BigDecimal despesaFixa) {
		this.despesaFixa = despesaFixa;
	}


	public BigDecimal getDespesaVariavel() {
		return despesaVariavel;
	}


	public void setDespesaVariavel(BigDecimal despesaVariavel) {
		this.despesaVariavel = despesaVariavel;
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
		FluxoCaixa other = (FluxoCaixa) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
